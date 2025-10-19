import Minio from 'minio';
import dotenv from "dotenv";
dotenv.config();

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT) || 9000,
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin'
})

// Initialize bucket with proper policies
const initMinio = async () => {
  const bucketName = process.env.MINIO_BUCKET || 'receipts'
  
  try {
    const exists = await minioClient.bucketExists(bucketName)
    if (!exists) {
      await minioClient.makeBucket(bucketName, 'us-east-1')
      console.log(`Created bucket ${bucketName}`)
      
      // Set bucket policy for public read access (adjust for production)
      await minioClient.setBucketPolicy(bucketName, JSON.stringify({
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: "*",
            Action: ["s3:GetObject"],
            Resource: [`arn:aws:s3:::${bucketName}/*`]
          }
        ]
      }))
    }
  } catch (err) {
    console.error('MinIO initialization error:', err)
  }
}

// Initialize MinIO connection
initMinio().catch(err => {
  console.error('Failed to initialize MinIO:', err)
})

module.exports = minioClient