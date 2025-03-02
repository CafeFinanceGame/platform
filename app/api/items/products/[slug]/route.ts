import { convertBufferToJson, convertFileToBuffer } from "@/lib/buffer";
import { cidManager, CIDType } from "@/utils/api";
import { postFileByTypeIpfs, getFileFromIpfs } from "@/utils/pinataClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const productCID = cidManager.getProductCID();

    const file = await getFileFromIpfs(productCID, slug);
    if (!file) {
        return NextResponse.json(
            { message: 'File not found' }, { status: 404 }
        );
    }

    const fileObject = convertBufferToJson(file.buffer);

    return NextResponse.json(fileObject, { status: 200 });
}

export async function PUT(request: NextRequest) {
    const productCID = cidManager.getProductCID();

    const formData = await request.formData();
    const file = formData.get('file');
    const fileObject = await convertFileToBuffer(file);

    const fileExists = await getFileFromIpfs(productCID, fileObject.name);
    if (!fileExists) {
        return NextResponse.json(
            { message: 'File does not exist' }, { status: 404 }
        );
    }

    const result = await postFileByTypeIpfs(CIDType.PRODUCT, fileObject.name, fileObject);

    return NextResponse.json(
        { message: 'File updated successfully', result },
        { status: 200 }
    );
}