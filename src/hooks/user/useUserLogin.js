import { useState, useCallback } from "react";
import axios from "@/utils/axios";

export default function useUserLogin() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const userLogin = useCallback(async ({ token }) => {
    if (!token) {
      setError("Token is required");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get("/user/user", {
        headers: {
          token: token,
        },
      });
      setResponse(res.data);
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  return { userLogin, response, error, loading };
}
