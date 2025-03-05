import { convertFileToBuffer } from "@/lib/buffer";
import { cidManager, CIDType } from "@/utils/api";
import { getFileFromIpfs, postFileByTypeIpfs } from "@/utils/pinataClient";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const eventCID = cidManager.getEventCID();

    const formData = await request.formData();
    const file = formData.get('file');
    if (!file) {
        return NextResponse.json(
            { message: 'File not found' }, { status: 400 }
        );
    }

    const fileObject = await convertFileToBuffer(file);

    try {
        const fileExists = await getFileFromIpfs(eventCID, slug);
        const result = await postFileByTypeIpfs(CIDType.EVENT, slug, fileObject);

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