import { play } from 'elevenlabs';
import { NextResponse } from 'next/server';
import path from 'path';
import { readFile } from 'fs/promises';

export async function POST(request) {
    const body = await request.json();
    const { filename } = body;

    const filepath = path.join(process.cwd(), 'public', 'audio', filename);

    console.log("filename: ", filename);

    try {
        const audioBuffer = await readFile(filepath);

        await play(audioBuffer);

        return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error('Error playing script voice:', error);
        return new NextResponse(null, { status: 500, statusText: 'Internal Server Error' });
    }
}
