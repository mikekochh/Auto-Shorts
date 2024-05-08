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
}

const defaultState: ShortContextType = {
    script: '',
    setScript: (newScript: string) => {},
    topic: '',
    setTopic: (newTopic: string) => {},
    imagePrompts: '',
    setImagePrompts: (newImagePrompts: string) => {}
};

const ShortContext = createContext<ShortContextType>(defaultState);

export function useShort() {
    return useContext(ShortContext);
}

export function ShortProvider({ children }) {

    const [script, setScript] = useState('');
    const [topic, setTopic] = useState('');
    const [imagePrompts, setImagePrompts] = useState('');

    return (
        <ShortContext.Provider value={{ script, setScript, topic, setTopic, imagePrompts, setImagePrompts }}>
            {children}
        </ShortContext.Provider>
    );
}
