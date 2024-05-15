"use client";

import { createContext, useContext, useState } from 'react';

interface ShortContextType {
    script: string;
    setScript: (newScript: string) => void;
    scriptArray: string[];
    setScriptArray: (newScript: string[]) => void;

    topic: string;
    setTopic: (newTopic: string) => void;

    imagePrompts: string;
    setImagePrompts: (newImagePrompts: string) => void;
    imagePromptsArray: object[];
    setImagePromptsArray: (newImagePromptsArray: object[]) => void;

    // imagePromptsArray needs to be set up so that it holds the image prompt, and then also the numbered sentence from the script

    splitUpScript: string;
    setSplitUpScript: (newSplitUpScript: string) => void;
    splitUpScriptArray: string[];
    setSplitUpScriptArray: (newSplitScript: string[]) => void;

    images: object[];
    setImages: (newImages: object[]) => void;
    selectedImages: string[];
    setSelectedImages: (newSelectedImages: string[]) => void;

    voicesArray: object[];
    setVoicesArray: (newVoicesArray: object[]) => void;
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
    setImagePromptsArray: (newImagePromptsArray: object[]) => {},

    splitUpScript: '',
    setSplitUpScript: (newSplitUpScript: string) => {},
    splitUpScriptArray: [],
    setSplitUpScriptArray: (newSplitScriptArray: string[]) => {},

    images: [],
    setImages: (newImages: object[]) => {},
    selectedImages: [],
    setSelectedImages: (newSelectedImages: string[]) => {},

    voicesArray: [],
    setVoicesArray: (newVoicesArray: object[]) => {}
};

const ShortContext = createContext<ShortContextType>(defaultState);

export function useShort() {
    return useContext(ShortContext);
}

export function ShortProvider({ children }) {

    const [script, setScript] = useState('');
    // const [scriptArray, setScriptArray] = useState<string[]>([]);

    // const [scriptArray, setScriptArray] = useState<string[]>([
    //     "This is the first example sentence for the script array.",
    //     "Here's another sample sentence, randomly included for testing.",
    //     "Lastly, a third example to populate the script array.",
    //     "An extra line just to spice things up a bit.",
    //     "Second new sentence, adding more variety and context.",
    //     "Finally, a sixth sentence to round off our script array."
    // ]);

    const [scriptArray, setScriptArray] = useState<string[]>([
        "This is the first example sentence for the script array."
    ]);

    const [topic, setTopic] = useState('');

    const [imagePrompts, setImagePrompts] = useState('');
    const [imagePromptsArray, setImagePromptsArray] = useState<object[]>([]);

    const [splitUpScript, setSplitUpScript] = useState('');
    const [splitUpScriptArray, setSplitUpScriptArray] = useState<string[]>([]);

    // const [images, setImages] = useState<object[]>([]);

    // Dummy data for if we are splitting up the sentences
    // const [images, setImages] = useState<object[]>([
    //     {
    //         "id": "9c0d0e7c-9b24-46a2-9fcf-bdc02bcdace3",
    //         "upscaled_urls": [
    //             "https://cl.imagineapi.dev/assets/23d39bba-ac13-4a50-b120-bf0d7ebe0ec1/23d39bba-ac13-4a50-b120-bf0d7ebe0ec1.png",
    //             "https://cl.imagineapi.dev/assets/26c64b23-bb0d-4a7d-8f03-d8364f4e12b9/26c64b23-bb0d-4a7d-8f03-d8364f4e12b9.png",
    //             "https://cl.imagineapi.dev/assets/bcd30628-a1bb-4f5a-9bb6-e3df0a011a5a/bcd30628-a1bb-4f5a-9bb6-e3df0a011a5a.png",
    //             "https://cl.imagineapi.dev/assets/ef4654ed-77f8-4920-ae85-0339f095a7a8/ef4654ed-77f8-4920-ae85-0339f095a7a8.png"
    //         ],
    //         "associatedScriptSentence": 1
    //     },
    //     {
    //         "id": "d7493160-52e5-4711-ba14-c2fa16fefe9d",
    //         "upscaled_urls": [
    //             "https://cl.imagineapi.dev/assets/8b344593-ee6c-4afd-82aa-cb9dcfe17d37/8b344593-ee6c-4afd-82aa-cb9dcfe17d37.png",
    //             "https://cl.imagineapi.dev/assets/88c5e1c2-6a4b-4d10-8016-da87111eaf9f/88c5e1c2-6a4b-4d10-8016-da87111eaf9f.png",
    //             "https://cl.imagineapi.dev/assets/d625736f-303c-496b-ab45-edfddeadadce/d625736f-303c-496b-ab45-edfddeadadce.png",
    //             "https://cl.imagineapi.dev/assets/b60e7b0d-9990-427b-901d-7decfd6917fe/b60e7b0d-9990-427b-901d-7decfd6917fe.png"
    //         ],
    //         "associatedScriptSentence": 2
    //     },
    //     {
    //         "id": "46ada02e-d558-4453-a17a-d635db1e7e1b",
    //         "upscaled_urls": [
    //             "https://cl.imagineapi.dev/assets/b4f4616f-dec4-4ea7-a044-36c1a9443695/b4f4616f-dec4-4ea7-a044-36c1a9443695.png",
    //             "https://cl.imagineapi.dev/assets/5b688233-7606-4b6f-9c21-2c86f7ec8c79/5b688233-7606-4b6f-9c21-2c86f7ec8c79.png",
    //             "https://cl.imagineapi.dev/assets/7e094825-4d25-4039-b54b-f86d11066808/7e094825-4d25-4039-b54b-f86d11066808.png",
    //             "https://cl.imagineapi.dev/assets/2c69918a-0328-4d44-8265-e23a8029da77/2c69918a-0328-4d44-8265-e23a8029da77.png"
    //         ],
    //         "associatedScriptSentence": 2
    //     },
    //     {
    //         "id": "b76e3a0e-c0b6-4e78-b895-53ac4a624c6f",
    //         "upscaled_urls": [
    //             "https://cl.imagineapi.dev/assets/7a291920-1ca5-4a26-a32d-9ad4a9fc49b5/7a291920-1ca5-4a26-a32d-9ad4a9fc49b5.png",
    //             "https://cl.imagineapi.dev/assets/f75496a8-df3b-412c-a18c-5faf0471acc1/f75496a8-df3b-412c-a18c-5faf0471acc1.png",
    //             "https://cl.imagineapi.dev/assets/51e6bb80-1e35-45ee-ba06-968fd3e5f612/51e6bb80-1e35-45ee-ba06-968fd3e5f612.png",
    //             "https://cl.imagineapi.dev/assets/ed252575-2820-4bf4-a374-fec8d5323ad7/ed252575-2820-4bf4-a374-fec8d5323ad7.png"
    //         ],
    //         "associatedScriptSentence": 3
    //     },
    //     {
    //         "id": "eaf074ed-a0b5-480c-83a3-434c1054dd12",
    //         "upscaled_urls": [
    //             "https://cl.imagineapi.dev/assets/3825dc05-f0a9-44b3-89b1-cc948fe4452e/3825dc05-f0a9-44b3-89b1-cc948fe4452e.png",
    //             "https://cl.imagineapi.dev/assets/af478408-4766-4cc4-bb74-e1e8bde2ac84/af478408-4766-4cc4-bb74-e1e8bde2ac84.png",
    //             "https://cl.imagineapi.dev/assets/7b2fb849-b626-4681-96ea-575f7b88b692/7b2fb849-b626-4681-96ea-575f7b88b692.png",
    //             "https://cl.imagineapi.dev/assets/e68f6931-fc07-48b2-87c7-7712d4746273/e68f6931-fc07-48b2-87c7-7712d4746273.png"
    //         ],
    //         "associatedScriptSentence": 3
    //     },
    //     {
    //         "id": "e9dbfcea-d24a-40a4-84c6-f05fe4d81ee7",
    //         "upscaled_urls": [
    //             "https://cl.imagineapi.dev/assets/b7207c08-3361-447e-a2e5-4a87a9b3a588/b7207c08-3361-447e-a2e5-4a87a9b3a588.png",
    //             "https://cl.imagineapi.dev/assets/724f6374-e63c-4595-8e05-027c69ea2e72/724f6374-e63c-4595-8e05-027c69ea2e72.png",
    //             "https://cl.imagineapi.dev/assets/be3c15dc-22e3-4ce4-b9eb-718d74a8f97e/be3c15dc-22e3-4ce4-b9eb-718d74a8f97e.png",
    //             "https://cl.imagineapi.dev/assets/782f96e8-5463-4eb2-9c10-3f87efe61c1f/782f96e8-5463-4eb2-9c10-3f87efe61c1f.png"
    //         ],
    //         "associatedScriptSentence": 4
    //     },
    //     {
    //         "id": "a29fbf73-19f3-4d7f-8d22-724068cb0d01",
    //         "upscaled_urls": [
    //             "https://cl.imagineapi.dev/assets/e93d8021-dd61-432a-aa26-b210aa186cc4/e93d8021-dd61-432a-aa26-b210aa186cc4.png",
    //             "https://cl.imagineapi.dev/assets/f646c8a8-c590-4ee2-a8f5-433987c4f978/f646c8a8-c590-4ee2-a8f5-433987c4f978.png",
    //             "https://cl.imagineapi.dev/assets/718b0a40-5422-433e-b0e0-2036f9fa5592/718b0a40-5422-433e-b0e0-2036f9fa5592.png",
    //             "https://cl.imagineapi.dev/assets/5a0e7338-d4ee-4f8c-9586-fa458eebde14/5a0e7338-d4ee-4f8c-9586-fa458eebde14.png"
    //         ],
    //         "associatedScriptSentence": 4
    //     },
    //     {
    //         "id": "3a38471d-9e8d-47d5-ba90-2778f954ad04",
    //         "upscaled_urls": [
    //             "https://cl.imagineapi.dev/assets/b67ec23c-a81a-4b20-b4b3-6272503407c2/b67ec23c-a81a-4b20-b4b3-6272503407c2.png",
    //             "https://cl.imagineapi.dev/assets/c4384b48-7e82-486c-9302-184aaeea96f0/c4384b48-7e82-486c-9302-184aaeea96f0.png",
    //             "https://cl.imagineapi.dev/assets/6840cb51-323a-4114-ac74-506467be6de2/6840cb51-323a-4114-ac74-506467be6de2.png",
    //             "https://cl.imagineapi.dev/assets/52bd5cc9-4b8e-4932-84be-52b8631f8d15/52bd5cc9-4b8e-4932-84be-52b8631f8d15.png"
    //         ],
    //         "associatedScriptSentence": 5
    //     },
    //     {
    //         "id": "0200ece2-0547-45c9-abed-070cc34e8acb",
    //         "upscaled_urls": [
    //             "https://cl.imagineapi.dev/assets/f86d472e-f1d0-42d7-8632-19e7d7603b47/f86d472e-f1d0-42d7-8632-19e7d7603b47.png",
    //             "https://cl.imagineapi.dev/assets/c7f2b722-26bc-41f2-9ff2-d3ce9c91f7f6/c7f2b722-26bc-41f2-9ff2-d3ce9c91f7f6.png",
    //             "https://cl.imagineapi.dev/assets/a6e90f40-4c16-4ab6-885d-22838c4eab9a/a6e90f40-4c16-4ab6-885d-22838c4eab9a.png",
    //             "https://cl.imagineapi.dev/assets/8100b8a8-2cc7-4280-8859-b8f6378138a4/8100b8a8-2cc7-4280-8859-b8f6378138a4.png"
    //         ],
    //         "associatedScriptSentence": 5
    //     },
    //     {
    //         "id": "85d7696e-d136-461e-81c8-798aacf62e23",
    //         "upscaled_urls": [
    //             "https://cl.imagineapi.dev/assets/095a32bb-6f53-4082-b30e-40852257df88/095a32bb-6f53-4082-b30e-40852257df88.png",
    //             "https://cl.imagineapi.dev/assets/a5399e78-05af-47de-88cd-82a2b0f7c69f/a5399e78-05af-47de-88cd-82a2b0f7c69f.png",
    //             "https://cl.imagineapi.dev/assets/5cb7c8af-35b8-457f-8b13-f814bcdf383a/5cb7c8af-35b8-457f-8b13-f814bcdf383a.png",
    //             "https://cl.imagineapi.dev/assets/619abf10-d999-4738-8e46-010687ae3b57/619abf10-d999-4738-8e46-010687ae3b57.png"
    //         ],
    //         "associatedScriptSentence": 6
    //     }
    // ])

    // Dummy data for when we are not splitting up sentences
    // const [images, setImages] = useState<object[]>([
    //     {
    //         "id": "9c0d0e7c-9b24-46a2-9fcf-bdc02bcdace3",
    //         "upscaled_urls": [
    //             "https://cl.imagineapi.dev/assets/23d39bba-ac13-4a50-b120-bf0d7ebe0ec1/23d39bba-ac13-4a50-b120-bf0d7ebe0ec1.png",
    //             "https://cl.imagineapi.dev/assets/26c64b23-bb0d-4a7d-8f03-d8364f4e12b9/26c64b23-bb0d-4a7d-8f03-d8364f4e12b9.png",
    //             "https://cl.imagineapi.dev/assets/bcd30628-a1bb-4f5a-9bb6-e3df0a011a5a/bcd30628-a1bb-4f5a-9bb6-e3df0a011a5a.png",
    //             "https://cl.imagineapi.dev/assets/ef4654ed-77f8-4920-ae85-0339f095a7a8/ef4654ed-77f8-4920-ae85-0339f095a7a8.png"
    //         ]
    //     },
    //     {
    //         "id": "d7493160-52e5-4711-ba14-c2fa16fefe9d",
    //         "upscaled_urls": [
    //             "https://cl.imagineapi.dev/assets/8b344593-ee6c-4afd-82aa-cb9dcfe17d37/8b344593-ee6c-4afd-82aa-cb9dcfe17d37.png",
    //             "https://cl.imagineapi.dev/assets/88c5e1c2-6a4b-4d10-8016-da87111eaf9f/88c5e1c2-6a4b-4d10-8016-da87111eaf9f.png",
    //             "https://cl.imagineapi.dev/assets/d625736f-303c-496b-ab45-edfddeadadce/d625736f-303c-496b-ab45-edfddeadadce.png",
    //             "https://cl.imagineapi.dev/assets/b60e7b0d-9990-427b-901d-7decfd6917fe/b60e7b0d-9990-427b-901d-7decfd6917fe.png"
    //         ]
    //     },
    //     {
    //         "id": "46ada02e-d558-4453-a17a-d635db1e7e1b",
    //         "upscaled_urls": [
    //             "https://cl.imagineapi.dev/assets/b4f4616f-dec4-4ea7-a044-36c1a9443695/b4f4616f-dec4-4ea7-a044-36c1a9443695.png",
    //             "https://cl.imagineapi.dev/assets/5b688233-7606-4b6f-9c21-2c86f7ec8c79/5b688233-7606-4b6f-9c21-2c86f7ec8c79.png",
    //             "https://cl.imagineapi.dev/assets/7e094825-4d25-4039-b54b-f86d11066808/7e094825-4d25-4039-b54b-f86d11066808.png",
    //             "https://cl.imagineapi.dev/assets/2c69918a-0328-4d44-8265-e23a8029da77/2c69918a-0328-4d44-8265-e23a8029da77.png"
    //         ]
    //     },
    //     {
    //         "id": "b76e3a0e-c0b6-4e78-b895-53ac4a624c6f",
    //         "upscaled_urls": [
    //             "https://cl.imagineapi.dev/assets/7a291920-1ca5-4a26-a32d-9ad4a9fc49b5/7a291920-1ca5-4a26-a32d-9ad4a9fc49b5.png",
    //             "https://cl.imagineapi.dev/assets/f75496a8-df3b-412c-a18c-5faf0471acc1/f75496a8-df3b-412c-a18c-5faf0471acc1.png",
    //             "https://cl.imagineapi.dev/assets/51e6bb80-1e35-45ee-ba06-968fd3e5f612/51e6bb80-1e35-45ee-ba06-968fd3e5f612.png",
    //             "https://cl.imagineapi.dev/assets/ed252575-2820-4bf4-a374-fec8d5323ad7/ed252575-2820-4bf4-a374-fec8d5323ad7.png"
    //         ]
    //     },
    //     {
    //         "id": "eaf074ed-a0b5-480c-83a3-434c1054dd12",
    //         "upscaled_urls": [
    //             "https://cl.imagineapi.dev/assets/3825dc05-f0a9-44b3-89b1-cc948fe4452e/3825dc05-f0a9-44b3-89b1-cc948fe4452e.png",
    //             "https://cl.imagineapi.dev/assets/af478408-4766-4cc4-bb74-e1e8bde2ac84/af478408-4766-4cc4-bb74-e1e8bde2ac84.png",
    //             "https://cl.imagineapi.dev/assets/7b2fb849-b626-4681-96ea-575f7b88b692/7b2fb849-b626-4681-96ea-575f7b88b692.png",
    //             "https://cl.imagineapi.dev/assets/e68f6931-fc07-48b2-87c7-7712d4746273/e68f6931-fc07-48b2-87c7-7712d4746273.png"
    //         ]
    //     },
    //     {
    //         "id": "eaf074ed-a0b5-480c-83a3-434c1054dd12",
    //         "upscaled_urls": [
    //             "https://cl.imagineapi.dev/assets/3825dc05-f0a9-44b3-89b1-cc948fe4452e/3825dc05-f0a9-44b3-89b1-cc948fe4452e.png",
    //             "https://cl.imagineapi.dev/assets/af478408-4766-4cc4-bb74-e1e8bde2ac84/af478408-4766-4cc4-bb74-e1e8bde2ac84.png",
    //             "https://cl.imagineapi.dev/assets/7b2fb849-b626-4681-96ea-575f7b88b692/7b2fb849-b626-4681-96ea-575f7b88b692.png",
    //             "https://cl.imagineapi.dev/assets/e68f6931-fc07-48b2-87c7-7712d4746273/e68f6931-fc07-48b2-87c7-7712d4746273.png"
    //         ]
    //     }
    // ])

    const [images, setImages] = useState<object[]>([
        {
            "id": "9c0d0e7c-9b24-46a2-9fcf-bdc02bcdace3",
            "upscaled_urls": [
                "https://cl.imagineapi.dev/assets/23d39bba-ac13-4a50-b120-bf0d7ebe0ec1/23d39bba-ac13-4a50-b120-bf0d7ebe0ec1.png",
                "https://cl.imagineapi.dev/assets/26c64b23-bb0d-4a7d-8f03-d8364f4e12b9/26c64b23-bb0d-4a7d-8f03-d8364f4e12b9.png",
                "https://cl.imagineapi.dev/assets/bcd30628-a1bb-4f5a-9bb6-e3df0a011a5a/bcd30628-a1bb-4f5a-9bb6-e3df0a011a5a.png",
                "https://cl.imagineapi.dev/assets/ef4654ed-77f8-4920-ae85-0339f095a7a8/ef4654ed-77f8-4920-ae85-0339f095a7a8.png"
            ]
        }
    ])

    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const [voicesArray, setVoicesArray] = useState<object[]>([]);

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
            setSplitUpScriptArray,

            images,
            setImages,
            selectedImages,
            setSelectedImages,

            voicesArray,
            setVoicesArray
        }}>
            {children}
        </ShortContext.Provider>
    );
}
