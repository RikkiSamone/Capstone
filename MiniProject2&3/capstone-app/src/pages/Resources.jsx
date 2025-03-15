import React, { useState } from "react";
import useYouTubeSearch from "../hooks/useYouTubeSearch";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const recommendedVideos = [
  { title: "What is Academic Coaching?", videoId: "BYBJQ5rIFjA" },
  { title: "6 Science-Based Study Skills", videoId: "CPxSzxylRCI" },
  { title: "Goal Setting", videoId: "i0QfCZjASX8" },
];

const ResourcesPage = () => {
  const { videos, loading, error, searchVideos } = useYouTubeSearch();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    searchVideos(query);
  };

  return (
    <Box sx={{ display: "flex", marginLeft: "150px", padding: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Educational Resources
        </Typography>

        {/* Recommended Videos Section */}
        <Typography variant="h5" gutterBottom>
          Recommended Videos
        </Typography>
        <Grid container spacing={3}>
          {recommendedVideos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.videoId}>
              <Card sx={{ maxWidth: "100%" }}>
                <CardMedia
                  component="iframe"
                  height="200"
                  width="100%"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  frameBorder="0"
                  allowFullScreen
                />
                <CardContent>
                  <Typography variant="h6">{video.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Search Section */}
        <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
          Search for More Videos
        </Typography>
        <form onSubmit={handleSearch}>
          <TextField
            variant="outlined"
            label="Search YouTube..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Search
          </Button>
        </form>

        {/* Search Results Section */}
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">Error: {error}</Typography>}

        {videos.length > 0 && (
          <>
            <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
              Search Results
            </Typography>
            <Grid container spacing={3}>
              {videos.map((video) => (
                <Grid item xs={12} sm={6} md={4} key={video.id.videoId}>
                  <Card sx={{ maxWidth: "100%" }}>
                    <CardMedia
                      component="iframe"
                      height="200"
                      width="100%"
                      src={`https://www.youtube.com/embed/${video.id.videoId}`}
                      frameBorder="0"
                      allowFullScreen
                    />
                    <CardContent>
                      <Typography variant="h6">{video.snippet.title}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default ResourcesPage;