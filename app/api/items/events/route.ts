import { NextRequest, NextResponse } from "next/server"
import { getFileFromIpfs, getListIpfs, postFileByTypeIpfs } from "@/utils/pinataClient"
import { cidManager, CIDType } from "@/utils/api"
import { convertFileToBuffer } from "@/lib/buffer";

export async function GET() {
    const eventCID = cidManager.getEventCID();
    if (!eventCID) {
        throw new Error("Event CID is undefined");
    }
    
    const lists = await getListIpfs();
    if (!lists) {
        return NextResponse.json(
            { message: 'Nothing was found or the API has occured error' }, 
            { status: 404 }
        );
    }

    return NextResponse.json(lists.data, { status: 200 });
}

export async function POST(request: NextRequest) {
    const eventCID = cidManager.getEventCID();
    if (!eventCID) {
        throw new Error("Event CID is undefined");
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const fileObject = await convertFileToBuffer(file);

    const fileExists = await getFileFromIpfs(eventCID, fileObject.name);
    if (fileExists) {
        return NextResponse.json(
            { message: 'File already exists' }, 
            { status: 409 }
        )
    }
    const result = await postFileByTypeIpfs(CIDType.EVENT, fileObject.name, fileObject);
    if (!result) {
        return NextResponse.json(
            { message: 'File upload failed' }, 
            { status: 500 }
        )
    }
    
}