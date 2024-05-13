"use client";
import React, { useState } from 'react';
import { useStep } from '../context/stepContext';
import { useShort } from '../context/shortContext';

export default function Script() {

    const { nextStep } = useStep();
    const { 
        setScript, 
        topic, 
        setTopic, 
        setImagePromptsArray,
        scriptArray, 
        setSplitUpScript,
        setScriptArray, 
        setSplitUpScriptArray 
    } = useShort();
    
    const [details, setDetails] = useState(''); 
    const [scriptResponse, setScriptResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [useExistingScript, setUseExistingScript] = useState(false);

    const fetchScript = async () => {
        if (!topic) {
            setError('Please enter a topic for your short.');
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('/api/script', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic: topic, details: details }) 
            });
            const data = await response.json();
            console.log("The original script: ", data.newScript[0].message.content);
            setScriptResponse(data.newScript[0].message.content);
            createScriptArray(data.newScript[0].message.content);
        } catch (err) {
            setError('Failed to fetch script: ' + err.message);
        }
        setIsLoading(false);
    };

    const createScriptArray = async (script: string) => {
        const cleanedScript = script.replace(/^\s*\d+\.\s*"?|"?$/gm, '');

        const sentences = cleanedScript.split('\n').filter(line => line.trim() !== '');

        console.log("sentences split into array: ", sentences);

        setScriptArray(sentences);
    }

    const createSplitUpScriptArray = async (splitScript: string) => {
        const cleanedScript = splitScript.replace(/^\s*\d+\.\s*"?|"?$/gm, '');

        const sentences = cleanedScript.split('\n').filter(line => line.trim() !== '');

        console.log("sentences split into array: ", sentences);

        setSplitUpScriptArray(sentences);
    }

    function formatText(text: string) {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    }

    const createSplitUpScript = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('/api/splitUpScript', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ script: scriptResponse, scriptLines: scriptArray.length })
                // body: JSON.stringify({ scriptArray })
            })

            const data = await response.json();
            console.log("split up script: ", data.newScript[0].message.content);
            setSplitUpScript(data.newScript[0].message.content);
            createImagePrompts(data.newScript[0].message.content)
        } catch (err) {
            console.log("There was an error splitting up the script for image processing: ", err);
        }
    }

    const createImagePrompts = async (scriptToBeImaged: string) => {
        console.log("createImagePrompts...");
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch('/api/imagePrompt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic, script: scriptToBeImaged})
            });
            const data = await response.json();
            console.log("Setting imagePromptsArray: ", data);
            setImagePromptsArray(data.imagePrompts);
        } catch (err) {
            setError('Failed to fetch image prompts: ' + err.message);
        }
        setIsLoading(false);
    }

    const selectScript = () => {
        nextStep();
        setScript(scriptResponse);
        createSplitUpScript();
    }

    const editScript = () => {
        setEditMode(true);
    }

    const finishedEdit = () => {
        if (!scriptResponse) {
            setError("Please enter a script");
            return;
        }
        setEditMode(false);
    }

    const redoScript = () => {
        setScriptResponse('');
    }

    const handleUseExistingScript = () => {
        setUseExistingScript(true);
        console.log("using existing script!");
    }

    const submitScript = () => {
        console.log("submitting script...");
    }

    const backToGenerateScript = () => {
        setUseExistingScript(false);
    }

    return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="w-full max-w-5xl flex flex-col items-center text-sm font-mono">
            <h1 className="text-green-500 text-center pb-3 text-4xl">Step 1: Create a Script</h1>
            {useExistingScript && (
                <div className="w-full">
                    <textarea
                        placeholder="Enter Script"
                        value={scriptResponse}
                        onChange={(e) => setScriptResponse(e.target.value)}
                        className="w-full px-2 py-1 border rounded min-h-[400px] max-h-[500px] text-black mb-4"
                    />
                    <div className="text-center space-x-4">
                        <button 
                            onClick={submitScript} 
                            disabled={isLoading} 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
                        >
                            Submit Script
                        </button>
                        <button 
                            onClick={backToGenerateScript} 
                            disabled={isLoading} 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
                        >
                            Generate Script
                        </button>
                    </div>
                </div>
            )} 
            {!scriptResponse && !useExistingScript && (
                <div>
                    <input
                        type="text"
                        placeholder="General topic of the script"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full px-2 py-1 border rounded text-black mb-4"
                    />
                    <textarea
                        placeholder="Detailed instructions (optional)"
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="w-full px-2 py-1 border rounded min-h-[100px] max-h-[300px] text-black mb-4"
                    />
                    {!isLoading && (
                        <div className="space-x-4 text-center">
                            <button 
                                onClick={fetchScript} 
                                disabled={isLoading} 
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
                            >
                                Generate Script
                            </button>
                            <button 
                                onClick={handleUseExistingScript} 
                                disabled={isLoading} 
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
                            >
                                Already Have a Script
                            </button>
                        </div>
                    )}
                </div>
            )}
        {error && <p className="text-red-500">{error}</p>}
        {!editMode && scriptResponse && (
            <div>
                <p className="text-green-500 text-center pb-3 text-xl">What do you think about this script?</p>
                <p className="text-green-500">{formatText(scriptResponse)}</p>
                {!isLoading && (
                    <div className="text-center space-x-4 pt-4">
                        <button 
                            onClick={selectScript} 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
                        >
                            Looks Good
                        </button>
                        <button 
                            onClick={editScript} 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
                        >
                            Edit Script
                        </button>
                        <button 
                            onClick={redoScript} 
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
                        >
                            Redo Script
                        </button>
                    </div>
                )}
            </div>
        )}
        {editMode && (
            <div className="w-full">
                <textarea
                    value={scriptResponse}
                    onChange={(e) => setScriptResponse(e.target.value)}
                    className="w-full px-2 py-1 border rounded text-black min-h-[100px] max-h-[300px]"
                />
                <div className='text-center'>
                    <button 
                        onClick={finishedEdit} 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4 text-center"
                    >
                        Done
                    </button>
                </div>
            </div>
        )}
        {isLoading && <p>Loading...</p>}
        </div>
    </main>
    );

}