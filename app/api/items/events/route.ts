import { NextRequest, NextResponse } from "next/server"
import { getFileFromIpfs, getListIpfs, postFileByTypeIpfs } from "@/utils/pinataClient"
import { cidManager, CIDType } from "@/utils/api"
import { convertFileToBuffer } from "@/lib/buffer";

export async function GET() {
    const eventCID = cidManager.getEventCID();
    
    try {
        const lists = await getListIpfs();
        return NextResponse.json(lists.data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error getting list', error: error.response.message },
            { status: error.response.status }
        );
    }
}

export async function POST(request: NextRequest) {
    const eventCID = cidManager.getEventCID();

    const formData = await request.formData();
    const file = formData.get('file');
    if (!file) {
        return NextResponse.json(
            { message: 'File not found' }, 
            { status: 400 }
        );
    }

    const fileObject = await convertFileToBuffer(file);
    try {
        const fileExists = await getFileFromIpfs(eventCID, fileObject.name);
        const result = await postFileByTypeIpfs(CIDType.EVENT, fileObject.name, fileObject);

        return NextResponse.json(
            { message: 'File uploaded successfully', result },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error uploading file', error: error.response.message },
            { status: error.response.status }
        )
    }
}