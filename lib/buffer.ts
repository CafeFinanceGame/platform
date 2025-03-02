export function convertBufferToJson(bufferObject: { type: string, data: number[] }): string {
    if (bufferObject.type !== "Buffer" || !Array.isArray(bufferObject.data)) {
        throw new Error("Invalid Buffer object format");
    }
    const data = String.fromCharCode(...bufferObject.data);

    return JSON.parse(data);
}

export async function convertFileToBuffer(file: any) {
    const fileBuffer = file.arrayBuffer();
    const fileObject = {
        name: file.name,
        type: file.type,
        buffer: Buffer.from(fileBuffer),
    };
    return fileObject;
}