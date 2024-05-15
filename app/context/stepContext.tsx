"use client";

import { createContext, useContext, useState } from 'react';

interface StepContextType {
    stepCounter: number;
    nextStep: () => void;
    prevStep: () => void; 
}

const defaultState: StepContextType = {
    stepCounter: 1,
    nextStep: () => {},
    prevStep: () => {}
};

const StepContext = createContext<StepContextType>(defaultState);

export function useStep() {
    return useContext(StepContext);
}

export function StepProvider({ children }) {
    const [stepCounter, setStepCounter] = useState(1);

    // Method to increment the stepCounter
    const nextStep = () => {
        setStepCounter(stepCounter + 1);
    };

    // Method to decrement the stepCounter
    const prevStep = () => {
        if (stepCounter > 1) setStepCounter(stepCounter - 1);
    };

    return (
        <StepContext.Provider value={{ stepCounter, nextStep, prevStep }}>
            {children}
        </StepContext.Provider>
    );
}
