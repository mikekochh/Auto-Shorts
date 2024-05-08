"use client";

import { createContext, useContext, useState } from 'react';

// might be better to make the script and image prompts into arrays of strings so that we can match images and videos to each one
interface ShortContextType {
    script: string;
    setScript: (newScript: string) => void;
    topic: string;
    setTopic: (newTopic: string) => void;
    imagePrompts: string;
    setImagePrompts: (newImagePrompts: string) => void;
    scriptArray: string[];
    setScriptArray: (newScript: string[]) => void;
    splitUpScript: string;
    setSplitUpScript: (newSplitUpScript: string) => void;
    splitUpScriptArray: string[];
    setSplitUpScriptArray: (newSplitScript: string[]) => void;
}

const defaultState: ShortContextType = {
    script: '',
    setScript: (newScript: string) => {},
    topic: '',
    setTopic: (newTopic: string) => {},
    imagePrompts: '',
    setImagePrompts: (newImagePrompts: string) => {},
    scriptArray: [],
    setScriptArray: (newScriptArray: string[]) => {},
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
    const [splitUpScript, setSplitUpScript] = useState('');
    const [splitUpScriptArray, setSplitUpScriptArray] = useState<string[]>([]);

    return (
        <ShortContext.Provider value={{ 
            script, 
            setScript, 
            topic, 
            setTopic, 
            imagePrompts, 
            setImagePrompts,
            scriptArray,
            setScriptArray,
            splitUpScript,
            setSplitUpScript,
            splitUpScriptArray,
            setSplitUpScriptArray
        }}>
            {children}
        </ShortContext.Provider>
    );
}
