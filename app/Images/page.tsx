"use client";
import React, { useState, useEffect } from 'react';
import { useStep } from '../context/stepContext';
import { useShort } from '../context/shortContext';

export default function Images() {

    const { 
        imagePrompts, 
        imagePromptsArray, 
        setImagePromptsArray, 
        scriptArray,
        images,
        setImages
    } = useShort();
    const { nextStep, prevStep } = useStep();
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    console.log("Images data: ", images);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            const fetchPromises = imagePromptsArray.map(prompt => {
                return fetch('/api/createImage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ imagePrompt: prompt })
                }).then(response => response.json())
                .then(data => data.image); // Directly return the image data
            });            
    
            try {
                const imagesData = await Promise.all(fetchPromises);
                console.log("imagesData: ", imagesData);
                setImages(imagesData);
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
        if (images) {
            console.log("images: ", images);
        }
    }, [images])

    // when we are splitting up the sentences
    // useEffect(() => {
    //     const fetchImages = async () => {
    //         setLoading(true);
    //         const fetchPromises = imagePromptsArray.map(prompt => {
    //             console.log("prompt: ", prompt);
    //             return fetch('/api/createImage', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({ imagePrompt: prompt.imagePrompt })
    //             }).then(response => response.json())
    //             .then(data => {
    //                 return { image: data.image, associatedScriptSentence: prompt.associatedScriptSentence };
    //             });
    //         });
    
    //         try {
    //             const imagesData = await Promise.all(fetchPromises);
    //             console.log("imagesData: ", imagesData);
    //             const formattedData = imagesData.map(item => ({
    //                 image: item.image,
    //                 associatedScriptSentence: item.associatedScriptSentence
    //             }));
    //             setImages(formattedData);
                
    //             console.log("All image data:", imagesData);
    //         } catch (error) {
    //             console.error('Failed to fetch data:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    
    //     if (imagePromptsArray.length > 0) {
    //         fetchImages();
    //     }
    // }, [imagePromptsArray]);

    useEffect(() => {
        if (imagePrompts) {
            const cleanedImagePrompt = imagePrompts.replace(/^\s*\d+\.\s*"?|"?$/gm, '');

            const newImagePrompts = cleanedImagePrompt.split('\n').filter(line => line.trim() !== '');

            console.log("Image prompts split into array: ", newImagePrompts);

            setImagePromptsArray(newImagePrompts);
        }
    }, [imagePrompts])

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="w-full max-w-5xl flex flex-col items-center text-sm font-mono">
                <h1 className="text-green-500 text-center pb-3 text-4xl">Step 2: Create the Images</h1>
                {loading ? (
                    <div>
                        <p className="text-green-500 text-center pb-3 text-xl">Your images are loading now...</p>
                    </div>
                ) : (
                    <div>
                        <p className="text-center pb-3 text-xl">Select Images to be turned into videos for each part of the script</p><br/><br/>
                        <div className="grid grid-cols-4 gap-4 justify-center">
                            {images.map((image, imageIndex) => (
                                <React.Fragment key={`image-${imageIndex}`}>
                                    <div className="col-span-4">
                                        <p className=" text-center text-xl">{scriptArray[imageIndex]}</p>
                                    </div>
                                    {image.upscaled_urls?.map((url, urlIndex) => (
                                        <div key={`${imageIndex}-${urlIndex}`} className="text-center">
                                            <img 
                                                src={url} 
                                                alt={`Upscaled image ${imageIndex + 1} url ${urlIndex + 1}`} 
                                                className={`m-2 ${selectedImage === imageIndex && selectedUrl === urlIndex ? 'border-4 border-blue-500' : ''}`}
                                                style={{ width: "100%", height: "auto" }}
                                                // onClick={() => { setSelectedImage(imageIndex); setSelectedUrl(urlIndex); }}
                                            />
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );

}