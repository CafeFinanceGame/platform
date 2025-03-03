import { NextRequest, NextResponse } from 'next/server';
import { getListIpfs, postFileByTypeIpfs, postFileToIpfs } from '@/utils/pinataClient';
import { cidManager, CIDType } from '@/utils/api';
import { convertFileToBuffer } from '@/lib/buffer';

export async function POST(request: NextRequest) {
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
    } catch (error: any) {
        console.error("Error at POST /api/ipfs/route.ts");
        return NextResponse.json(
            { message: 'Error uploading file', error: error.response.message },
            { status: error.response.status || 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const params = url.searchParams;
    const query: { [key: string]: string } = {}
        params.forEach((value, key) => {
            query[key] = value;
        }
    );

    try {
        const lists = await getListIpfs(query);
        return NextResponse.json(lists.data);
    } catch (error: any) {
        console.error("Error at GET /api/ipfs/route.ts");
        return NextResponse.json(
            { message: 'Error getting files', error: error.response.message },
            { status: error.response.status || 500 }
        );
    }
}