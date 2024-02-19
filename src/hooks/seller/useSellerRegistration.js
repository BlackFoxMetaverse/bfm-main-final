import axios from "@/utils/axios";
import s3FileUpload from "@/utils/imageUploader";
import { useCallback, useState } from "react";

export default function useSellerRegistration() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const sellerRegistration = useCallback(
    async ({
      token,
      imageFile,
      coverImageFile,
      userName,
      profession,
      description,
      tags,
      experience,
      coordinates,
    }) => {
      try {
        setLoading(true);
        const image = await s3FileUpload(imageFile);
        const coverImage = await s3FileUpload(coverImageFile);
        const res = await axios.post(
          "/user/seller",
          {
            image,
            coverImage,
            userName,
            profession,
            description,
            tags,
            experience,
            coordinates,
          },
          {
            headers: {
              token: token,
            },
          }
        );
        setResponse(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { sellerRegistration, response, error, loading };
}
