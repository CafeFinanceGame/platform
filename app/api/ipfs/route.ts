import { NextRequest, NextResponse } from 'next/server';
import { getListIpfs, postFileByTypeIpfs, postFileToIpfs } from '@/utils/pinataClient';
import { cidManager, CIDType } from '@/utils/api';
import fs from 'fs';
import path from 'path';
import { arrayBuffer } from 'stream/consumers';
import { convertFileToBuffer } from '@/lib/buffer';

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
        const fileObject = await convertFileToBuffer(file);
        const result = await postFileToIpfs(fileObject);
        
        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in API route: ', error);
        return NextResponse.json(
            { error: 'Error uploading file' },
            { status: 500 }
        );
    }
}

export async function GET() {
    const lists = await getListIpfs();
    if (!lists) {
        return NextResponse.json(
            { message: 'No files found' },
            { status: 404 }
        );
    }

    return NextResponse.json(lists.data);
}