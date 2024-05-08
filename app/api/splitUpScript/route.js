import { NextResponse } from "next/server";
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {

    const body = await request.json();

    const fullScript = body.script;
    const scriptLines = body.scriptLines;

    console.log("scriptLines: ", scriptLines);

    const breakScriptPromptBeginning = "I have a script for a YouTube short that is about " + scriptLines + " sentences long. Some sentences are longer than others. Could you please help me break up the longer sentences into smaller, coherent segments without changing the original meaning? Each segment should ideally be concise enough to match a single visual. Only return a numbered list with the new sentences, nothing else. Keep it in between 8-12 shorter sentences. Here is the script\n###\n";

    const breakScriptPromptFull = breakScriptPromptBeginning + fullScript;

    try {
        const newScript = await breakUpScript(breakScriptPromptFull);
        return NextResponse.json({ newScript }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "There was an error writing the script!"}, { error });
    }
}

async function breakUpScript(scriptPrompt) {
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [{role: "user", content: scriptPrompt}],
    })
    console.log('chatCompletion: ', chatCompletion);

    return chatCompletion.choices;
}
