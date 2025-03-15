import { useState } from "react";

const useYouTubeSearch = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchVideos = async (query) => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
          `http://localhost:5001/api/youtube/search?query=${query}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }

      const data = await response.json();
      setVideos(data.items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { videos, loading, error, searchVideos };
};

export default useYouTubeSearch;