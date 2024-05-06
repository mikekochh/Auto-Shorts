"use client";

import { createContext, useContext, useState } from 'react';

interface ShortContextType {
    script: string;
    setScript: (newScript: string) => void;
    topic: string;
    setTopic: (newTopic: string) => void;
}

const defaultState: ShortContextType = {
    script: '',
    setScript: (newScript: string) => {},
    topic: '',
    setTopic: (newTopic: string) => {}
};

const ShortContext = createContext<ShortContextType>(defaultState);

export function useShort() {
    return useContext(ShortContext);
}

export function ShortProvider({ children }) {

    const [script, setScript] = useState('');
    const [topic, setTopic] = useState('');

    return (
        <ShortContext.Provider value={{ script, setScript, topic, setTopic }}>
            {children}
        </ShortContext.Provider>
    );
}
