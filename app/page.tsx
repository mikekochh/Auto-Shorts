"use client";
import React, { useState } from 'react';
import Script from './Script/page';
import Images from './Images/page';
import Videos from './Videos/page';
import { useStep } from './context/stepContext';

export default function Home() {
  const { stepCounter } = useStep();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-5xl flex flex-col items-center text-sm font-mono">
        {stepCounter == 1 && (
          <div><Script/></div>
        )}
        {stepCounter == 2 && (
          <div><Images /></div>
        )} 
        {stepCounter == 3 && (
          <div><Videos /></div>
        )} 
      </div>
    </main>
  );
  
}
