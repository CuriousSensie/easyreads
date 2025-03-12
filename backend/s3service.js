import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import path from "path";

dotenv.config();

// Initialize S3 Client
const s3 = new S3Client({
    region: process.env.AWS_REGION, 
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const s3Upload = async (file) => {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    let contentType = file.mimetype;

    // Ensure EPUB files have the correct Content-Type
    if (fileExtension === ".epub") {
        contentType = "application/epub+zip";
    }

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuidv4()}-${file.originalname}`,
        Body: file.buffer,
        ContentType: contentType,
    };

    try {
        const command = new PutObjectCommand(params);
        await s3.send(command);

        // Return the file URL
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    } catch (error) {
        console.error("S3 Upload Error:", error);
        throw new Error("File upload failed");
    }
};

export default s3Upload;
