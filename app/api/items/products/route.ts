import { convertFileToBuffer } from "@/lib/buffer";
import { cidManager, CIDType } from "@/utils/api";
import { getFileFromIpfs, getListIpfs, postFileByTypeIpfs } from "@/utils/pinataClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const productCID = cidManager.getProductCID();

    const lists = await getListIpfs();
    if (!lists) {
        return NextResponse.json(
            { message: 'No files found' }, { status: 404 }
        );
    }

    return NextResponse.json(lists.data, { status: 200 });
}


export async function POST(request: NextRequest) {
    const fileObject = await convertFileToBuffer(request);

    const productCID = cidManager.getProductCID();
    if (!productCID) {
        throw new Error("Product CID is undefined");
    }
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
}