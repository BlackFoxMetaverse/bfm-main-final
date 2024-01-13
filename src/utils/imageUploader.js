import AWS from "aws-sdk";
import uniqid from "uniqid";

const BUCKET_NAME = "bfmimageholder";
const s3 = new AWS.S3({
  accessKeyId: "AKIAQ4F2NXYFPQBPRNIX",
  secretAccessKey: "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",
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
      Bucket: BUCKET_NAME,
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
