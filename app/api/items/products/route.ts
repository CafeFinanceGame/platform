import { convertFileToBuffer } from "@/lib/buffer";
import { cidManager, CIDType } from "@/utils/api";
import { getFileFromIpfs, getListIpfs, postFileByTypeIpfs } from "@/utils/pinataClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const lists = await getListIpfs();
        return NextResponse.json(lists.data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { message: 'Error getting list' },
            { status: error.response.status }
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
        const fileExists = await getFileFromIpfs(productCID, fileObject.name);
        if (fileExists) {
            return NextResponse.json(
                { message: 'File already exists' }, { status: 409 }
            );
        }

        const result = await postFileByTypeIpfs(CIDType.PRODUCT, fileObject.name, fileObject);

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