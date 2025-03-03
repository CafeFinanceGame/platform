import { convertBufferToJson, convertFileToBuffer } from "@/lib/buffer";
import { cidManager, CIDType } from "@/utils/api";
import { postFileByTypeIpfs, getFileFromIpfs } from "@/utils/pinataClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const productCID = cidManager.getProductCID();

    try {
        const file = await getFileFromIpfs(productCID, slug);
        const fileObject = convertBufferToJson(file.buffer);

        return NextResponse.json(fileObject, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error getting file', error: error.response.message },
            { status: error.response.status }
        );
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const productCID = cidManager.getProductCID();

    const formData = await request.formData();
    const file = formData.get('file');
    if (!file) {
        return NextResponse.json(
            { message: 'File not found' }, { status: 400 }
        );
    }

    const fileObject = await convertFileToBuffer(file);

    try {
        const fileExists = await getFileFromIpfs(productCID, slug);
        const result = await postFileByTypeIpfs(CIDType.PRODUCT, fileObject.name, fileObject);

        return NextResponse.json(
            { message: 'File updated successfully', result },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error updating file', error: error.response.message },
            { status: error.response.status }
        );
    }
}