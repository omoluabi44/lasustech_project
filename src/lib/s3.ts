import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export async function uploadFileToS3(fileBuffer: Buffer, fileName: string, contentType: string) {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("AWS_S3_BUCKET_NAME is not set");
  }

  const params = {
    Bucket: bucketName,
    Key: `uploads/${Date.now()}-${fileName.replace(/\s+/g, '-')}`,
    Body: fileBuffer,
    ContentType: contentType,
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  // Return the public URL
  return `https://${bucketName}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${params.Key}`;
}

export async function generatePresignedUrl(fileName: string, contentType: string) {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  if (!bucketName) {
    throw new Error("AWS_S3_BUCKET_NAME is not set");
  }

  const key = `uploads/${Date.now()}-${fileName.replace(/\s+/g, '-')}`;
  const params = {
    Bucket: bucketName,
    Key: key,
    ContentType: contentType,
  };

  const command = new PutObjectCommand(params);
  // URL expires in 5 minutes
  const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 300 });
  const publicUrl = `https://${bucketName}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${key}`;

  return { presignedUrl, publicUrl };
}
