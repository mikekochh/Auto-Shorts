"use client";
import React, { useState, useEffect } from 'react';
import { useStep } from '../context/stepContext';
import { useShort } from '../context/shortContext';

import axios from 'axios';

export default function Images() {

    const { 
        script, 
        topic, 
        imagePrompts, 
        imagePromptsArray, 
        setImagePromptsArray, 
        setScriptArray,
        images,
        setImages
    } = useShort();
    const { nextStep, prevStep } = useStep();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                for(let i = 0; i < 1; i++) {
                    const response = await fetch('/api/createImage', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ imagePrompt: imagePromptsArray[i] }) 
                    });

                    console.log('response: ', response);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (imagePromptsArray.length > 0) {
            fetchImages();
        }
        
    }, [imagePromptsArray]);

    useEffect(() => {
        if (imagePrompts) {
            const cleanedImagePrompt = imagePrompts.replace(/^\s*\d+\.\s*"?|"?$/gm, '');

            const newImagePrompts = cleanedImagePrompt.split('\n').filter(line => line.trim() !== '');

            console.log("Image prompts split into array: ", newImagePrompts);

            setImagePromptsArray(newImagePrompts);
        }
    }, [imagePrompts])

    const createScriptArray = async (script: string) => {
        const cleanedScript = script.replace(/^\s*\d+\.\s*"?|"?$/gm, '');

        const sentences = cleanedScript.split('\n').filter(line => line.trim() !== '');

        setScriptArray(sentences);
    }

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
                <h1 className="text-green-500 text-center pb-3 text-4xl">Step 2: Create the Images</h1>
                <p>Here are the image prompts:</p>
                <p>{formatText(imagePrompts)}</p>
            </div>
        </main>
    );

}