import { NextRequest, NextResponse } from 'next/server';
import { addNftToType } from '@/utils/pinataClient';
import { cidManager, CIDType } from '@/utils/api';
import fs from 'fs';
import path from 'path';
import { arrayBuffer } from 'stream/consumers';

export async function POST(request: any) {
    try {
        const formData = await request.formData();
        
        const file = formData.get('file');
    
        if (!file) {
            return NextResponse.json(
                { error: 'Json is required' },
                { status: 400 }
            );
        }

        const fileBuffer = await file.arrayBuffer();
        const fileObject = {
            name: file.name,
            type: file.type,
            buffer: Buffer.from(fileBuffer),
        };

        const result = await addNftToType(CIDType.PRODUCT, file.name, fileObject);
        
        cidManager.setCID(CIDType.PRODUCT, result.typeCid);
        
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in API route: ', error);
        return NextResponse.json(
            { error: 'Error uploading file' },
            { status: 500 }
        );
    }
}

export async function GET(request: any) {
    return NextResponse.json(
        { message: 'Hello from IPFS API!' }
    );

}