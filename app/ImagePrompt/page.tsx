"use client";
import React, { useState, useEffect } from 'react';
import { useStep } from '../context/stepContext';
import { useShort } from '../context/shortContext';

export default function ImagePrompt() {

    const { script, topic, imagePrompts } = useShort();
    const { nextStep, prevStep } = useStep();

    function formatText(text: string) {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    }

    return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="w-full max-w-5xl flex flex-col items-center text-sm font-mono">
            <h1 className="text-green-500 text-center pb-3 text-4xl">Step 2: Create the Image Prompts</h1>
            <p>This is the topic:</p>
            <p>{topic}</p>
            <p>Here is the script from last page:</p>
            <p>{formatText(script)}</p>
            <p>Here are the image prompts for this script:</p>
            <p>{formatText(imagePrompts)}</p>
        </div>
    </main>
    );

}