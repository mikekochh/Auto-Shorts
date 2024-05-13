import { NextResponse } from "next/server";
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {

    const body = await request.json();

    console.log("are we getting here?");
    console.log("body: ", body);

    const fullScript = body.script;

    const scriptLines = body.scriptLines;

    const breakScriptPromptBeginning = "I have a script for a YouTube short that is " + scriptLines + " sentences long.  Some sentences are longer than others. Could you please help me break up the longer sentences into smaller, coherent segments without changing the original meaning? Each segment should ideally be concise enough to match a single visual. I also need to keep track of where each short sentence came from in the original script, so at the end of each new short sentence, add a (n), where n represents which sentence from the script the shorter sentence came from. For example, if it came from the first sentence, it would be (1). Only return the new shorter sentences, and then at the end the (n). Keep it in between 8-12 shorter sentences. Add a line break between each new sentence. Here is the script:\n###\n";

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
