import { NextResponse } from "next/server";
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {

    const body = await request.json();

    // const shortTopic = body.topic;
    const script = body.script;


    const imagePromptBeginning = "I want you to produce image prompts for midjourney for me to create visuals for each part of this script. I want an image for each line. Create an image prompt that is relevant and would look cool for each line of this script. Only return to me the image prompt list as a numbered list, nothing else. Here is the script:\n###\n";

    const imagePromptFull = imagePromptBeginning + script;

    try {
        const newImagePrompts = await writeImagePrompts(imagePromptFull);
        return NextResponse.json({ newImagePrompts }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "There was an error writing the image prompts!"}, { error });
    }
}

async function writeImagePrompts(scriptPrompt) {
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [{role: "user", content: scriptPrompt}],
    })
    console.log('chatCompletion: ', chatCompletion);

    return chatCompletion.choices;
}
