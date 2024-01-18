import AWS from "aws-sdk";
import uniqid from "uniqid";

const bucket_name = process.env.NEXT_PUBLIC_BUCKET_NAME;
const access_key_id = process.env.NEXT_PUBLIC_ACCESS_KEY_ID;
const secret_access_key = process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY;
const region = process.env.NEXT_PUBLIC_REGION;

const s3 = new AWS.S3({
  accessKeyId: access_key_id,
  secretAccessKey: secret_access_key,
  region: region,
});

/**
 * Uploads a file (image or PDF) to AWS S3 and returns a promise that resolves with the unique file name of the uploaded file.
 *
 * @param {File} file - The file (image or PDF) to be uploaded.
 * @returns {Promise<string>} A promise that resolves with the unique file name of the uploaded file.
 */

export default function s3FileUpload(file) {
  return new Promise((resolve, reject) => {
    const extension = file.name.split(".").pop();
    const uniqueFileName = `${uniqid()}.${extension}`;

    const params = {
      Bucket: bucket_name,
      Key: uniqueFileName,
      Body: file,
    };

    s3.upload(params, (err) => {
      if (err) {
        console.log("s3 upload error: ", err);
        reject("Error uploading to S3");
      } else {
        resolve(uniqueFileName);
      }
    });
  });
}
