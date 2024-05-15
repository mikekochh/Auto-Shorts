const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const Blob = require('blob'); 
const FormData = require('form-data');

const bearerToken = 'Bearer ' + process.env.STABILITY_API_KEY;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request) {
    try {
        const body = await request.json();
        const imageUrls = body.imageUrls;

        await downloadAndConvertImages(imageUrls);

        await createVideosFromStable();

        return new Response(JSON.stringify({ message: 'Images downloaded and converted successfully.' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error processing the request: ', error);
        return new Response(JSON.stringify({ error: 'Failed to process images.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

const downloadAndConvertImages = async (urls) => {
    console.log("downloadingAndConvertImages running...");
    const downloadImage = async (url, index) => {
        const response = await axios({
            url,
            responseType: 'arraybuffer'
        });
        const buffer = Buffer.from(response.data, 'binary');
        const outputFilePath = path.join(process.cwd(), 'public/images', `image${index + 1}.png`);

        await sharp(buffer)
            .resize(576, 1024)
            .png()
            .toFile(outputFilePath);

        console.log(`Downloaded and converted ${url} to ${outputFilePath}`);
    };

    for (let i = 0; i < urls.length; i++) {
        try {
            await downloadImage(urls[i], i);
        } catch (error) {
            console.error(`Failed to process ${urls[i]}: `, error);
        }
    }
};


const createVideosFromStable = async () => {
    console.log("creatingVideosFromStable running...")
    const imagesDir = path.join(process.cwd(), "public/images");
    const files = fs.readdirSync(imagesDir).filter(file => file.match(/^image\d+\.png$/));

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.join(imagesDir, file);
        const data = new FormData();
    
        const stream = fs.createReadStream(filePath);
    
        data.append("image", stream, {
            filename: file,
            contentType: 'image/png'
        });
        data.append("seed", 0);
        data.append("cfg_scale", 1.8);
        data.append("motion_bucket_id", 127);
    
        try {
            const response = await axios.request({
                url: `https://api.stability.ai/v2beta/image-to-video`,
                method: "post",
                validateStatus: undefined,
                headers: {
                    authorization: bearerToken,
                    ...data.getHeaders(),
                },
                data: data,
            });

            if (response.data.errors) {
                throw new Error(`Error when generating video: ${response.data.errors[0]}`);
            }

            console.log("response.data: ", response.data);
    
            const videoGenerationID = response.data.id;

            console.log("videoGenerationID: ", videoGenerationID);
    
            await fetchVideo(videoGenerationID, i + 1);
    
        } catch (error) {
            console.error(`Error processing ${file}:`, error.message);
        }
    }
    
};

const fetchVideo = async (generationVideoID, videoIndex) => {
    console.log("fetchVideo...");
    while (true) {
        const response = await axios.request({
            url: `https://api.stability.ai/v2beta/image-to-video/result/${generationVideoID}`,
            method: "GET",
            validateStatus: undefined,
            responseType: "arraybuffer",
            headers: {
              Authorization: bearerToken,
              Accept: "video/*", // Use 'application/json' to receive base64 encoded JSON
            },
        });

        if (response.status === 202) {
            console.log("Generation is still running, try again in 10 seconds.");
            await delay(11000);
        } else if (response.status === 200) {
            console.log("Generation is complete!");

            // Define the path to the public/videos directory
            const outputPath = path.join(process.cwd(), 'public/videos', `video${videoIndex}.mp4`);

            // Write the file to the specified directory
            fs.writeFileSync(outputPath, Buffer.from(response.data));
            return;
        } else {
            throw new Error(`Response ${response.status}: ${response.data.toString()}`);
        }
    }
}