import { convertBufferToJson, convertFileToBuffer } from "@/lib/buffer";
import { cidManager, CIDType } from "@/utils/api";
import { getFileFromIpfs, getListIpfs, postFileByTypeIpfs } from "@/utils/pinataClient";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const urlSearchParams = new URLSearchParams(request.url);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { type } = params;
    
    const productCID = cidManager.getProductCID();

    try {
        const file = await getFileFromIpfs(productCID, type + '.json');
        const fileObject = convertBufferToJson(file.buffer);

        return NextResponse.json(fileObject, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error getting file', error: error.response?.message },
            { status: error.response?.status }
        );
    }
}


export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!file) {
        return NextResponse.json(
            { message: 'File not found' }, { status: 400 }
        );
    }

    const fileObject = await convertFileToBuffer(file);
    const productCID = cidManager.getProductCID();

    try {
        const result = await postFileByTypeIpfs(CIDType.PRODUCT, fileObject.name, fileObject);

        return NextResponse.json(
            { message: 'File uploaded successfully', result },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error uploading file', error: error.response?.data || '' }, 
            { status: error.response?.status || 500 }
        )
    }
}