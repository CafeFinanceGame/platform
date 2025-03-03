import { metadata } from "@/app/layout";
import fs from 'fs';
import path from 'path';
import { CIDType } from "./api";
import axios from "axios";
import pinata from '@pinata/sdk'
import { NextResponse } from "next/server";
import { convertFileToBuffer } from "@/lib/buffer";
import { NotFoundError } from "next/dist/client/components/not-found";

const pinataClient = new pinata(
	process.env.NEXT_PUBLIC_PINATA_API_KEY, 
	process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY
);

const pinataGateway = 'https://gateway.pinata.cloud/ipfs/';

// Keep track of the latest type folders locally
const localTypeFolders = './nft_types';
	if (!fs.existsSync(localTypeFolders)) {
	fs.mkdirSync(localTypeFolders);
}

export async function postFileByTypeIpfs(nftType: any, nftId: any, fileObject: any) {
	// Create or access the type folder
	const typeFolder = path.join(localTypeFolders, nftType);

	if (!fs.existsSync(typeFolder)) {
		fs.mkdirSync(typeFolder);
	}
	
	// Add the new NFT to the type folder
	fs.writeFileSync(
		path.join(typeFolder, nftId),
		typeof fileObject === 'string' ? fileObject : JSON.stringify(fileObject)
	);
	
	// Re-upload the entire type folder to get a new CID
	try {
		const result = await pinataClient.pinFromFS(typeFolder, {
			pinataMetadata: { 
				name: `NFT-Type-${nftType}-${Date.now()}` 
			}
		});
		
		// Return the updated CID for this type
		return {
			typeCid: result.IpfsHash,
			fileUri: `ipfs://${result.IpfsHash}/${nftId}`,
			folderUrl: `${pinataGateway}${result.IpfsHash}`
		};
	} catch (error: any) {
		console.error('Error in API route: ', error.response.data);
		console.error('Code:', error.response.status);
		console.error('Message:', error.response.message);
		throw error;
	}
}

export async function getListIpfs(query: {
	cid?: string;
	includeCount?: boolean;
	metadata?: string;
	status?: string;
	pageLimit?: number;
	pageOffset?: number;
} = {}
) {
	try {
		const queryStr = new URLSearchParams(
			Object.entries(query)
			.filter(([, value]) => value !== undefined && value !== null)
			.reduce((acc, [key, value]) => {
				acc[key] = value?.toString();
				return acc;
			}, {} as Record<string, string>)
		).toString();
		const result = await axios.get(
			`${pinataGateway}$/data/pinList?${queryStr}`
		);
		return result;
	} catch (error: any) {
		console.error('Error in API route: ', error.response.data);
		console.error('Code:', error.response.status);
		console.error('Message:', error.response.message);
		throw error;
	}
}

export async function getFileFromIpfs(cid: string, fileName: string) {
	try {
		const result = await axios.get(`${pinataGateway}${cid}/${fileName}`);
		return result.data;
	} catch (error: any) {
		console.error('Error fetching from IPFS: ', error.response.data);
		console.error('Code:', error.response.status);
		console.error('Message:', error.response.message);
		throw error;
	}
}

export async function postFileToIpfs(fileObject: any) {
	try {
		const result = await pinataClient.pinFileToIPFS(fileObject, {
			pinataMetadata: { 
				name: fileObject.name, 
			}
		});
		
		return result;
	} catch (error: any) {
		console.error('Error in API route: ', error.response.data);
		console.error('Code:', error.response.status);
		console.error('Message:', error.response.message);
		throw error;
	}
}