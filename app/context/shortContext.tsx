"use client";

import { createContext, useContext, useState } from 'react';

// might be better to make the script and image prompts into arrays of strings so that we can match images and videos to each one
interface ShortContextType {
    script: string;
    setScript: (newScript: string) => void;
    scriptArray: string[];
    setScriptArray: (newScript: string[]) => void;

    topic: string;
    setTopic: (newTopic: string) => void;

    imagePrompts: string;
    setImagePrompts: (newImagePrompts: string) => void;
    imagePromptsArray: string[];
    setImagePromptsArray: (newImagePromptsArray: string[]) => void;

    images: string[];
    setImages: (newImages: string) => void;

    splitUpScript: string;
    setSplitUpScript: (newSplitUpScript: string) => void;
    splitUpScriptArray: string[];
    setSplitUpScriptArray: (newSplitScript: string[]) => void;
}

const defaultState: ShortContextType = {
    script: '',
    setScript: (newScript: string) => {},
    scriptArray: [],
    setScriptArray: (newScriptArray: string[]) => {},

    topic: '',
    setTopic: (newTopic: string) => {},

    imagePrompts: '',
    setImagePrompts: (newImagePrompts: string) => {},
    imagePromptsArray: [],
    setImagePromptsArray: (newImagePromptsArray: string[]) => {},

    splitUpScript: '',
    setSplitUpScript: (newSplitUpScript: string) => {},
    splitUpScriptArray: [],
    setSplitUpScriptArray: (newSplitScriptArray: string[]) => {}
};

const ShortContext = createContext<ShortContextType>(defaultState);

export function useShort() {
    return useContext(ShortContext);
}

export function ShortProvider({ children }) {

    const [script, setScript] = useState('');
    const [scriptArray, setScriptArray] = useState<string[]>([]);

    const [topic, setTopic] = useState('');

    const [imagePrompts, setImagePrompts] = useState('');
    const [imagePromptsArray, setImagePromptsArray] = useState<string[]>([]);

    const [splitUpScript, setSplitUpScript] = useState('');
    const [splitUpScriptArray, setSplitUpScriptArray] = useState<string[]>([]);


    return (
        <ShortContext.Provider value={{ 
            script, 
            setScript, 
            scriptArray,
            setScriptArray,

            topic, 
            setTopic, 

            imagePrompts, 
            setImagePrompts,
            imagePromptsArray,
            setImagePromptsArray,

            splitUpScript,
            setSplitUpScript,
            splitUpScriptArray,
            setSplitUpScriptArray
        }}>
            {children}
        </ShortContext.Provider>
    );
}
