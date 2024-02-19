import axios from "@/utils/axios";
import { useCallback, useState } from "react";

export default function useSearch() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const search = useCallback(
    async ({ longitude, latitude, distance, limitUsers, profession, page }) => {
      setLoading(true);
      try {
        const res = await axios.get("/search/nearby", {
          params: {
            longitude,
            latitude,
            distance,
            limitUsers,
            profession,
            page,
          },
        });

        setResponse(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { search, response, error, loading };
}
