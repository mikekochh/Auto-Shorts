import { NextResponse } from "next/server";
const elevenLabs = require('elevenlabs-js');
const fs = require("fs");

elevenLabs.setApiKey(process.env.ELEVENLABS_API_KEY);
const voiceIDAdam = "pNInz6obpgDQGcFmaJgB";

export async function POST(request) {

    const body = await request.json();
    const scriptLine = body.scriptLine;

    try {

        elevenLabs.textToSpeech(voiceIDAdam, scriptLine, "elevenlabs_multilingual_v2", {
            stability: 0.95,
            similarity_boost: 0.75,
            style: 0.06,
            use_speaker_boost: true
        }).then(async (res) => {
            await res.saveFile("voice.mp3")
        });

        return NextResponse.json({ newImagePrompts }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "There was an error generating voice for script!"}, { error });
    }
}