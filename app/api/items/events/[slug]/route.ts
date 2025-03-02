import { convertBufferToJson, convertFileToBuffer } from "@/lib/buffer";
import { cidManager, CIDType } from "@/utils/api";
import { getFileFromIpfs, postFileByTypeIpfs } from "@/utils/pinataClient";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const eventCID = cidManager.getEventCID();

    const file = await getFileFromIpfs(eventCID, slug);
    
    if (!file) {
        return NextResponse.json(
            { message: 'File not found' }, 
            { status: 404 }
        );
    }
    const fileObject = convertBufferToJson(file.buffer);

    return NextResponse.json(fileObject, { status: 200 });
}

export async function PUT(request: any) {
    const eventCID = cidManager.getEventCID();

    const formData = await request.formData();
    const file = formData.get('file');
    const fileObject = await convertFileToBuffer(file);

    const fileExists = await getFileFromIpfs(eventCID, fileObject.name);
    if (!fileExists) {
        return NextResponse.json(
            { message: 'File does not exist' }, 
            { status: 404 }
        );
    }

    const result = await postFileByTypeIpfs(CIDType.EVENT, fileObject.name, fileObject);

    return NextResponse.json(
        { message: 'File updated successfully', result },
        { status: 200 }
    );
}