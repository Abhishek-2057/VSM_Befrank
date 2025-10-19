import multer from 'multer';

// Use memory storage to hold files as buffers before sending to MinIO
const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
});

// This middleware will parse 'mainImage' (1 file) and 'galleryImages' (up to 10 files)
export const eventUpload = upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'galleryImages', maxCount: 10 }
]);




// import minioClient from './minioConfig';
// import path from 'path';
// import fs from 'fs';
// import { v4 as uuidv4 } from 'uuid';

// const uploadToMinio = async (file) => {
//   const bucketName = process.env.MINIO_BUCKET || 'receipts';
//   const objectName = `${uuidv4()}${path.extname(file.originalname)}`;
//   let uploadSuccess = false;

//   try {
//     // Upload to MinIO
//     await minioClient.fPutObject(
//       bucketName,
//       objectName,
//       file.path,
//       {
//         'Content-Type': file.mimetype,
//         'Original-Filename': file.originalname
//       }
//     );
//     uploadSuccess = true;

//     // Generate presigned URL (7 days expiry)
//     const presignedUrl = await minioClient.presignedGetObject(
//       bucketName,
//       objectName,
//       7 * 24 * 60 * 60
//     );

//     return {
//       filename: file.originalname,
//       objectName,
//       bucketName,
//       url: presignedUrl,
//       path:file.path,
//       uploadedAt: new Date()
//     };
//   } catch (err) {
//     console.error('File upload failed:', err);
//     throw new Error('Failed to upload file to storage');
//   } finally {
//     // Always clean up temp file if it exists
//     try {
//       if (fs.existsSync(file.path)) {
//         fs.unlinkSync(file.path);
//         console.log(`Cleaned up temp file: ${file.path}`);
//       }
//     } catch (err) {
//       console.error('Error during temp file cleanup:', err);
//       if (uploadSuccess) {
//         // If upload succeeded but cleanup failed, we can continue
//         console.warn('Upload succeeded but temp file cleanup failed');
//       } else {
//         // If both upload and cleanup failed, rethrow the original error
//         throw err;
//       }
//     }
//   }
// };



// module.exports = { uploadToMinio };