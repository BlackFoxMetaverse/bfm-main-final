import axios from "@/utils/axios";
import s3FileUpload from "@/utils/imageUploader";
import { useCallback, useState } from "react";

export default function useUserRegistration() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const userRegistration = useCallback(
    async ({ token, name, email, imageFile }) => {
      setLoading(true);
      try {
        const uploadedImage = await s3FileUpload(imageFile);
        const res = await axios.post(
          "/user/user",
          {
            name: name,
            email: email,
            image: uploadedImage,
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

  return { userRegistration, response, error, loading };
}
