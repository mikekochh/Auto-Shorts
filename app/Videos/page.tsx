"use client";
import React, { useState, useEffect } from 'react';
import { useShort } from '../context/shortContext';

export default function Videos() {
    const { selectedImages } = useShort();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const downloadImages = async () => {
            console.log("downloading the images now...");
            if (selectedImages.length > 0) {
                try {
                    const response = await fetch('/api/createVideos', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ imageUrls: selectedImages })
                    });

                    if (response.ok) {
                        console.log('Images downloaded and converted successfully');
                    } else {
                        console.error('Failed to download and convert images');
                    }
                } catch (error) {
                    console.error('Error during fetch:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        downloadImages();
    }, [selectedImages]);

    const createVideos = async () => {
        console.log("downloading the images now...");
        if (selectedImages.length > 0) {
            try {
                const response = await fetch('/api/createVideos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ imageUrls: selectedImages })
                });

                if (response.ok) {
                    console.log('Images downloaded and converted successfully');
                } else {
                    console.error('Failed to download and convert images');
                }
            } catch (error) {
                console.error('Error during fetch:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="w-full max-w-5xl flex flex-col items-center text-sm font-mono">
                <h1 className="text-green-500 text-center pb-3 text-4xl">Step 3: Create the Videos</h1>
                {loading ? (
                    <div>
                        <p className="text-green-500 text-center pb-3 text-xl">Your videos are loading now...</p>
                    </div>
                ) : (
                    <div>
                        <p>Should always be loading</p>
                    </div>
                )}
                <div>
                    {selectedImages.map((image, index) => (
                        <img key={index} src={image} alt={`Selected image ${index + 1}`} />
                    ))}
                </div>
                <div>
                    <button 
                        onClick={createVideos} 
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
                    >
                        Create Videos
                    </button>
                </div>
            </div>
        </main>
    );
}
