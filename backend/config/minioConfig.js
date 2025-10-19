// import { Client } from 'minio';
// import dotenv from 'dotenv';
// import { v4 as uuidv4 } from 'uuid';

// dotenv.config();

// // 1. Initialize MinIO Client
// export const minioClient = new Client({
//     endPoint: process.env.MINIO_ENDPOINT,
//     port: parseInt(process.env.MINIO_PORT, 10),
//     useSSL: process.env.MINIO_USE_SSL === 'true',
//     accessKey: process.env.MINIO_ACCESS_KEY,
//     secretKey: process.env.MINIO_SECRET_KEY,
// });

// // 2. Helper function to upload files
// export const uploadFileToMinio = async (file) => {
//     const bucketName = process.env.MINIO_BUCKET;
//     const objectName = `events/${uuidv4()}-${file.originalname}`;

//     try {
//         // Ensure bucket exists
//         const bucketExists = await minioClient.bucketExists(bucketName);
//         if (!bucketExists) {
//             await minioClient.makeBucket(bucketName, 'us-east-1');
//             console.log(`Bucket ${bucketName} created.`);
//         }

//         // Upload the file
//         await minioClient.putObject(bucketName, objectName, file.buffer, file.mimetype);

//         // Return the public URL
//         const fileUrl = `${process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http'}://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${objectName}`;
        
//         return fileUrl;

//     } catch (error) {
//         console.error("Error uploading file to MinIO:", error);
//         throw new Error("File upload failed");
//     }
// };


// config/minioConfig.js

import { Client } from 'minio';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

// 1. Initialize MinIO Client
export const minioClient = new Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT, 10),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
});

const BUCKET_NAME = process.env.MINIO_BUCKET || 'events';
const EXPIRY_IN_SECONDS = 7 * 24 * 60 * 60; // 7 days


export const uploadAndGetPresignedUrl = async (file) => {
    try {
        const bucketExists = await minioClient.bucketExists(BUCKET_NAME);
        if (!bucketExists) {
            await minioClient.makeBucket(BUCKET_NAME, 'us-east-1');
            console.log(`Bucket ${BUCKET_NAME} created.`);
        }

        const objectName = `events/${uuidv4()}-${file.originalname}`;

        await minioClient.putObject(BUCKET_NAME, objectName, file.buffer, file.mimetype);

        const url = await minioClient.presignedGetObject(BUCKET_NAME, objectName, EXPIRY_IN_SECONDS);

        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + EXPIRY_IN_SECONDS);

        return {
            url,
            objectName,
            originalName: file.originalname,
            expiresAt,
        };
    } catch (error) {
        console.error("Error in MinIO upload helper:", error);
        throw new Error("Failed to upload file and generate URL.");
    }
};