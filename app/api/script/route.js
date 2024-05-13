import { NextResponse } from "next/server";
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// To handle a GET request to /api
export async function POST(request) {

    const body = await request.json();

    const scriptTheme = body.topic;
    const scriptDetails = body.details;
    let fullScriptPrompt = "";
    const scriptPromptBeginning = "Create a 30 second script for a youtube short talking about " + scriptTheme + ".";
    fullScriptPrompt += scriptPromptBeginning;
    if (scriptDetails) {
        fullScriptPrompt += "Incorporate these details into the script: " + scriptDetails + "\n";
    }
    // Add two line breaks in between each sentence.
    const scriptPromptEnding = "Return the script as a numbered list. Make it no longer than 6 sentences. Only give me the narrator text for each sentence, nothing else at all. Just narrator text.";
    fullScriptPrompt += scriptPromptEnding;

    try {
        const newScript = await writeScript(fullScriptPrompt);
        return NextResponse.json({ newScript }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "There was an error writing the script!"}, { error });
    }
}

async function writeScript(scriptPrompt) {
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [{role: "user", content: scriptPrompt}],
    })
    console.log('chatCompletion: ', chatCompletion);

    return chatCompletion.choices;
}
