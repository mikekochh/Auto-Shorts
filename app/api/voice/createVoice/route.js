import { NextResponse } from 'next/server';
import { ElevenLabsClient } from 'elevenlabs';
import { writeFile, mkdir } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { existsSync } from 'fs';

const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY
});

export async function POST(request) {
    const body = await request.json();
    const scriptLine = body.scriptLine;

    console.log("Script Line: ", scriptLine);

    try {
        const responseAudio = await elevenlabs.generate({
            voice: 'Adam',
            text: scriptLine,
            model_id: 'eleven_multilingual_v2'
        });

        const filename = `${uuidv4()}.mp3`;
        const audioDir = path.join(process.cwd(), 'public', 'audio');

        // Ensure the directory exists
        if (!existsSync(audioDir)) {
            await mkdir(audioDir, { recursive: true });
        }

        const filepath = path.join(audioDir, filename);

        await writeFile(filepath, responseAudio, 'binary');

        return new NextResponse(JSON.stringify({ filename }), { status: 200 });
    } catch (error) {
        console.error('Error generating voice:', error);
        return new NextResponse(null, { status: 500, statusText: 'Internal Server Error' });
    }
}
