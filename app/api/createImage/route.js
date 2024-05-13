import { NextResponse } from "next/server";
import axios from "axios";

const bearerToken = 'Bearer ' + process.env.MIDJOURNEY_TOKEN_ID;

export async function POST(request) {
    console.log("running create image endpoint...");

    const body = await request.json();
    const data = {
        prompt: body.imagePrompt + " --ar 9:16"
    };

    console.log("just want to make sure were getting here: ", data);

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

        while(true) {
            console.log('Checking image details');
            const responseImage = await fetch(`https://cl.imagineapi.dev/items/images/${imageID}`, {
                method: 'GET',
                headers: {
                    'Authorization': bearerToken,
                    'Content-Type': 'application/json'
                }
            });
            console.log("response: ", responseImage);
            
            const responseData = await responseImage.json();
            console.log("responseData: ", responseData);

            if (responseData.data.status === 'completed' || responseData.data.status === 'failed') {
                console.log('Completed image detials', responseData.data);
                return NextResponse.json({image: responseData.data});
            }

            console.log('responseData.data.error: ', responseData.data.error);

            if (responseData.data.error) {
                console.log("There has been some error in generating the image: ", responseData.data.error);
                return NextResponse.json({image: responseData.data});
            }

            await sleep(5000);
        }
        return NextResponse.json({message: "testing"});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "There was an error creating the image!", error: error.toString() }, 500);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
