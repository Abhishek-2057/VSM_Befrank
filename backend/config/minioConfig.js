

import { Client } from 'minio';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

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
        }
        const objectName = `events/${uuidv4()}-${file.originalname}`;
        await minioClient.putObject(BUCKET_NAME, objectName, file.buffer, file.mimetype);
        const url = await minioClient.presignedGetObject(BUCKET_NAME, objectName, EXPIRY_IN_SECONDS);
        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + EXPIRY_IN_SECONDS);
        return { url, objectName, originalName: file.originalname, expiresAt };
    } catch (error) {
        console.error("Error in MinIO upload helper:", error);
        throw new Error("Failed to upload file and generate URL.");
    }
};


export const deleteFileFromMinio = async (objectName) => {
    try {
        await minioClient.removeObject(BUCKET_NAME, objectName);
        console.log(`Successfully deleted ${objectName} from MinIO.`);
    } catch (error) {
        console.error(`Failed to delete ${objectName} from MinIO:`, error);
        // We don't throw an error here to allow the main operation to continue
    }
};


export const deleteMultipleFilesFromMinio = async (objectNames) => {
    if (!objectNames || objectNames.length === 0) return;
    try {
        // MinIO SDK v7+ removeObjects returns a stream of errors
        const errors = await new Promise((resolve, reject) => {
            const errorList = [];
            const stream = minioClient.removeObjects(BUCKET_NAME, objectNames);
            stream.on('error', (err) => errorList.push(err));
            stream.on('end', () => resolve(errorList));
        });
        if (errors.length > 0) {
           console.error('Errors encountered while deleting multiple objects:', errors);
        } else {
           console.log('Successfully deleted multiple objects from MinIO.');
        }
    } catch (error) {
        console.error(`Failed to delete multiple objects from MinIO:`, error);
    }
};