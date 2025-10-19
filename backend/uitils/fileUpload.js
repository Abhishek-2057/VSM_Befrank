const minioClient = require('./minioConfig');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const uploadToMinio = async (file) => {
  const bucketName = process.env.MINIO_BUCKET || 'receipts';
  const objectName = `${uuidv4()}${path.extname(file.originalname)}`;
  let uploadSuccess = false;

  try {
    // Upload to MinIO
    await minioClient.fPutObject(
      bucketName,
      objectName,
      file.path,
      {
        'Content-Type': file.mimetype,
        'Original-Filename': file.originalname
      }
    );
    uploadSuccess = true;

    // Generate presigned URL (7 days expiry)
    const presignedUrl = await minioClient.presignedGetObject(
      bucketName,
      objectName,
      7 * 24 * 60 * 60
    );

    return {
      filename: file.originalname,
      objectName,
      bucketName,
      url: presignedUrl,
      path:file.path,
      uploadedAt: new Date()
    };
  } catch (err) {
    console.error('File upload failed:', err);
    throw new Error('Failed to upload file to storage');
  } finally {
    // Always clean up temp file if it exists
    try {
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
        console.log(`Cleaned up temp file: ${file.path}`);
      }
    } catch (err) {
      console.error('Error during temp file cleanup:', err);
      if (uploadSuccess) {
        // If upload succeeded but cleanup failed, we can continue
        console.warn('Upload succeeded but temp file cleanup failed');
      } else {
        // If both upload and cleanup failed, rethrow the original error
        throw err;
      }
    }
  }
};



module.exports = { uploadToMinio };