import { convertBufferToJson, convertFileToBuffer } from "@/lib/buffer";
import { cidManager, CIDType } from "@/utils/api";
import { getFileFromIpfs, postFileByTypeIpfs } from "@/utils/pinataClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const companyCID = cidManager.getCompanyCID();
    
    try {
        const file = await getFileFromIpfs(companyCID, slug);
        const fileObject = convertBufferToJson(file.buffer);

        return NextResponse.json(fileObject, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error getting file', error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const companyCID = cidManager.getCompanyCID();

    try {
        const fileExists = await getFileFromIpfs(companyCID, slug);
        
        const formData = await request.formData();
        const file = formData.get('file');
        const fileObject = await convertFileToBuffer(file);

        const result = await postFileByTypeIpfs(CIDType.COMPANY, slug, fileObject);

        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error uploading file', error: error.message },
            { status: 500 }
        );
    }
}