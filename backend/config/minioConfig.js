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

// 2. Helper function to upload files
export const uploadFileToMinio = async (file) => {
    const bucketName = process.env.MINIO_BUCKET;
    const objectName = `events/${uuidv4()}-${file.originalname}`;

    try {
        // Ensure bucket exists
        const bucketExists = await minioClient.bucketExists(bucketName);
        if (!bucketExists) {
            await minioClient.makeBucket(bucketName, 'us-east-1');
            console.log(`Bucket ${bucketName} created.`);
        }

        // Upload the file
        await minioClient.putObject(bucketName, objectName, file.buffer, file.mimetype);

        // Return the public URL
        const fileUrl = `${process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http'}://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${bucketName}/${objectName}`;
        
        return fileUrl;

    } catch (error) {
        console.error("Error uploading file to MinIO:", error);
        throw new Error("File upload failed");
    }
};



// import Minio from 'minio';
// import dotenv from "dotenv";
// dotenv.config();

// const minioClient = new Minio.Client({
//   endPoint: process.env.MINIO_ENDPOINT || 'localhost',
//   port: parseInt(process.env.MINIO_PORT) || 9000,
//   useSSL: process.env.MINIO_USE_SSL === 'true',
//   accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
//   secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin'
// })

// // Initialize bucket with proper policies
// const initMinio = async () => {
//   const bucketName = process.env.MINIO_BUCKET || 'receipts'
  
//   try {
//     const exists = await minioClient.bucketExists(bucketName)
//     if (!exists) {
//       await minioClient.makeBucket(bucketName, 'us-east-1')
//       console.log(`Created bucket ${bucketName}`)
      
//       // Set bucket policy for public read access (adjust for production)
//       await minioClient.setBucketPolicy(bucketName, JSON.stringify({
//         Version: "2012-10-17",
//         Statement: [
//           {
//             Effect: "Allow",
//             Principal: "*",
//             Action: ["s3:GetObject"],
//             Resource: [`arn:aws:s3:::${bucketName}/*`]
//           }
//         ]
//       }))
//     }
//   } catch (err) {
//     console.error('MinIO initialization error:', err)
//   }
// }

// // Initialize MinIO connection
// initMinio().catch(err => {
//   console.error('Failed to initialize MinIO:', err)
// })

// module.exports = minioClient