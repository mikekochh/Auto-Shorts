import { NextResponse } from "next/server";
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request) {

    const body = await request.json();

    const shortTopic = body.topic;
    const shortScript = body.script;

    const imagePromptBeginning = "I am creating a youtube short talking about " + shortTopic + ".";
    const imagePromptMiddle = "Here is the script that I have written for this youtube short: \n###\n" + shortScript;
    const imagePromptEnding = "Give me a list of text prompts that I can use with midjourney to generate images for each of these sentences in the script. Just give me the text prompts, absolutely nothing else.";

    const fullImagePrompts = imagePromptBeginning + imagePromptMiddle + imagePromptEnding;

    try {
        const newImagePrompts = await writeImagePrompts(fullImagePrompts);
        return NextResponse.json({ newImagePrompts }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "There was an error writing the image prompts!"}, { error });
    }
}

async function writeImagePrompts(scriptPrompt) {
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: scriptPrompt}],
    })
    console.log('chatCompletion: ', chatCompletion);

    return chatCompletion.choices;
}
