import axios from "@/utils/axios";
import s3FileUpload from "@/utils/imageUploader";
import { useCallback, useState } from "react";

export default function useProfileRegistration() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const profileRegister = useCallback(
    async ({
      token,
      collegeName,
      certificateFile,
      socialMediaLinks,
      experienceDetail,
      imagesFileArray,
    }) => {
      setLoading(true);
      try {
        const imagesPromises = imagesFileArray.map(async (file, index) => {
          if (file !== null) {
            try {
              return await s3FileUpload(file);
            } catch (uploadError) {
              console.error(`Error uploading image ${index + 1}:`, uploadError);
              return null;
            }
          } else {
            return null;
          }
        });

        const images = await Promise.all(imagesPromises);

        let certificate = null;
        if (certificateFile !== null) {
          try {
            certificate = await s3FileUpload(certificateFile);
          } catch (certificateUploadError) {
            console.error(
              "Error uploading certificate:",
              certificateUploadError
            );
          }
        }

        const res = await axios.post(
          "/user/sellerProfile",
          {
            collegeName,
            certificate,
            socialMediaLinks,
            experienceDetail,
            images,
          },
          {
            headers: {
              token: token,
            },
          }
        );
        setResponse(res.data);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { profileRegister, response, error, loading };
}
