import { NextResponse } from "next/server";
import axios from "axios";

const bearerToken = 'Bearer ' + process.env.MIDJOURNEY_TOKEN_ID;

export async function POST(request) {
    console.log("running create image endpoint...");

    const body = await request.json();
    const data = {
        prompt: body.imagePrompt + " --ar 9:16"
    };

    try {
        const response = await axios.post('http://cl.imagineapi.dev/items/images/', data, {
            headers: {
                'Authorization': bearerToken,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);

        const imageID = response.data.data.id;

        console.log("imageID: ", imageID);

        let statusPending = true;

        while(statusPending) {
            console.log("waiting...");
            const imageReadyResponse = await axios.get(`http://cl.imagineapi.dev/items/images/${imageID}`, {
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer ' + bearerToken, 
                  'Content-Type': 'application/json'
                }
            })

            const responseData = await imageReadyResponse.json();

            console.log("imageResponse status: ", responseData);

            // if (imageReadyResponse.data.status !== 'pending') {
            //     console.log("imageReadyResponse data: ", imageReadyResponse.data);
            //     statusPending = false;
            // }
        }


        return NextResponse.json(responseData); // Send the actual data back
    } catch (error) {
        console.error(error);
        // The second parameter of NextResponse.json() should be status code, not an object
        return NextResponse.json({ message: "There was an error creating the image!", error: error.toString() }, 500);
    }
}
