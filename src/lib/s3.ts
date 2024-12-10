import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  endpoint: import.meta.env.VITE_AWS_ENDPOINT,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

export const BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME;

export const uploadToS3 = async (file: File, key: string): Promise<string> => {
  try {
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read',
    });

    await s3Client.send(command);
    
    const baseUrl = import.meta.env.VITE_AWS_ENDPOINT;
    const directUrl = `${baseUrl}/${BUCKET_NAME}/${key}`;
    return directUrl;
  } catch (error) {
    console.error('S3上传错误:', error);
    throw new Error('文件上传失败');
  }
};