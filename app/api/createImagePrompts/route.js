import { NextResponse } from "next/server";
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {

    const body = await request.json();

    const script = body.script;
    const topic = body.topic;

    const completelyCleanedScript = script.replace(/^\s*\d+\.\s*|\s*\(\d+\)\s*$/gm, '');

    const imagePromptBeginning = "I want you to produce text prompts to generate cool images in midjourney for each sentence in this youtube short script about " + topic + ". I want an image prompt for each line. Only return to me the image prompt list as a numbered list, nothing else and no other details. Here is the script:\n###\n";

    const imagePromptFull = imagePromptBeginning + completelyCleanedScript;

    try {
        const newImagePrompts = await writeImagePrompts(imagePromptFull);
        const cleanedImagePrompts = newImagePrompts[0].message.content.replace(/^\s*\d+\.\s*(?:Image:|Image Prompt:)?\s*/gm, '');
        const imagePromptsArray = cleanedImagePrompts.split('\n');
        return NextResponse.json({ imagePrompts: imagePromptsArray }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "There was an error writing the image prompts!"}, { error });
    }
}

async function writeImagePrompts(scriptPrompt) {
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: scriptPrompt}],
    })

    return chatCompletion.choices;
}
