import { metadata } from "@/app/layout";
import fs from 'fs';
import path from 'path';
import { CIDType } from "./api";
import axios from "axios";
import pinata from '@pinata/sdk'

const pinataClient = new pinata(process.env.NEXT_PUBLIC_PINATA_API_KEY, process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY);

// Keep track of the latest type folders locally
const localTypeFolders = './nft_types';
if (!fs.existsSync(localTypeFolders)) {
  fs.mkdirSync(localTypeFolders);
}

export async function addNftToType(nftType: any, nftId: any, jsonContent: any) {
  // Create or access the type folder
  const typeFolder = path.join(localTypeFolders, nftType);

  if (!fs.existsSync(typeFolder)) {
    fs.mkdirSync(typeFolder);
  }
  
  // Add the new NFT to the type folder
  fs.writeFileSync(
    path.join(typeFolder, nftId),
    typeof jsonContent === 'string' ? jsonContent : JSON.stringify(jsonContent)
  );
  
  // Re-upload the entire type folder to get a new CID
  const result = await pinataClient.pinFromFS(typeFolder, {
    pinataMetadata: { name: `NFT-Type-${nftType}-${Date.now()}` }
  });
  
  // Return the updated CID for this type
  return {
    typeCid: result.IpfsHash,
    nftUri: `ipfs://${result.IpfsHash}/${nftId}.json`,
    latestTypeUri: `ipfs://${result.IpfsHash}/`
  };
}