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

    const cleanedScriptNoBeginningListNumbers = script.replace(/^\s*\d+\.\s*/gm, '');

    const imagePromptBeginning = "I want you to produce text prompts to generate images in midjourney for each sentence in this youtube short script about " + topic + ". I want an image prompt for each line. Only return to me the image prompt list as a numbered list, nothing else and no other details. Here is the script:\n###\n";

    const imagePromptFull = imagePromptBeginning + completelyCleanedScript;

    try {
        const newImagePrompts = await writeImagePrompts(imagePromptFull);
        console.log("dirty script: ", script);
        console.log("\n");
        console.log('dirty image prompts: ', newImagePrompts[0].message.content);
        console.log("\n");
        const cleanedImagePrompts = newImagePrompts[0].message.content.replace(/^\s*\d+\.\s*(?:Image:|Image Prompt:)?\s*/gm, '');
        const newImagePromptArray = createImagePromptArray(cleanedScriptNoBeginningListNumbers, cleanedImagePrompts);
        return NextResponse.json({ imagePrompts: newImagePromptArray }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "There was an error writing the image prompts!"}, { error });
    }
}

async function writeImagePrompts(scriptPrompt) {
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [{role: "user", content: scriptPrompt}],
    })

    return chatCompletion.choices;
}

function createImagePromptArray(script, imagePrompts) {

    console.log('cleaned script:\n', script);
    console.log('\n');
    console.log('cleaned image promtps:\n', imagePrompts);
    console.log("\n");

    const lines = script.split('\n');
    const imagePromptsArray = imagePrompts.split('\n');
    console.log("image prompts in an array: ", imagePromptsArray);
    const newImagePromptsArray = [];

    for (let i = 0; i < lines.length; i++) {
        const match = lines[i].match(/\((\d+)\)[.\s]*/);
        console.log("match: ", match);
        if (match) {
            const associatedScriptSentence = parseInt(match[1], 10);
            console.log("associatedScriptSentence: ", associatedScriptSentence);
            console.log("\n");
            console.log("image prompt array at i: ", imagePromptsArray[i]);
            newImagePromptsArray.push({ associatedScriptSentence, imagePrompt: imagePromptsArray[i]});
        }
    }

    console.log('final image Prompts Array: ', newImagePromptsArray);

    return newImagePromptsArray; 
}
