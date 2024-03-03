import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem, // Add MenuItem for dropdown
} from "@material-ui/core";

function AddMovie() {
  const [movieName, setMovieName] = useState("");
  const [rate, setRatings] = useState("");
  const [votes, setVotes] = useState("");
  const [minutes, setMinutes] = useState("");
  const [releasedate, setReleasedate] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [genre, setGenre] = useState(""); // Add genre state
  const [posterUrl, setMoviePoster] = useState(""); // Add moviePoster state
  const [backdropUrl, setMovieBackdrop] = useState(""); // Add movieBackdrop state
  const [tagline, setTagline] = useState(""); // Add tagline state
  const inputRef = React.useRef();

  const onClear = () => {
    setRatings("");
    setVotes("");
    setMinutes("");
    setReleasedate("");
    setMovieName("");
    setSynopsis("");
    setGenre("");
    setMoviePoster("");
    setMovieBackdrop("");
    setTagline("");
    inputRef.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      movieName,
      rate,
      votes,
      minutes,
      releasedate,
      synopsis,
      genre,
      posterUrl,
      backdropUrl,
      tagline,
    };
    console.log("Submitting form with data:", newMovie);
  

  axios.post("https://w9nbvf6p6e.execute-api.us-east-1.amazonaws.com/v1/create-movie", newMovie, {
  withCredentials: false,
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
    // Add any other headers as needed
  }
})
.then((response) => {
  console.log("Movie created:", response.data);
  // Optionally, you can reset the form fields after successful submission
  onClear();
})
.catch((error) => {
  console.error("Error creating movie:", error);
});
  }

  return (
    <div className="App">
      <br />
      <br />
      <br />
      <br />
      <Grid>
        <Card
          style={{
            maxWidth: "50%",
            padding: "20px 5px",
            margin: "0 auto",
            backgroundColor: "#f5f5f5",
            boxShadow: "0 10px 6px rgba(0, 0, 0, 0.16)",
          }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              style={{ fontFamily: "Source Sans Pro", fontSize: "34px" }}
            >
              Add a New Movie
            </Typography>
            <br />
            <form autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    type="text"
                    placeholder="Movie Name"
                    inputRef={inputRef}
                    autoFocus
                    variant="outlined"
                    name="fname"
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  {/* Tagline */}
                  <TextField
                    type="text"
                    placeholder="Tagline"
                    variant="outlined"
                    name="tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="text"
                    placeholder="Ratings"
                    variant="outlined"
                    name="ratings"
                    value={rate}
                    onChange={(e) => setRatings(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="text"
                    placeholder="Number of Votes"
                    variant="outlined"
                    name="phone"
                    value={votes}
                    onChange={(e) => setVotes(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="text"
                    placeholder="Minutes"
                    variant="outlined"
                    name="minutes"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="text"
                    placeholder="Release Date"
                    variant="outlined"
                    name="Release Date"
                    value={releasedate}
                    onChange={(e) => setReleasedate(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="text"
                    placeholder="Synopsis"
                    variant="outlined"
                    name="Synopsis"
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  {/* Genre Dropdown */}
                  <TextField
                    select
                    label="Genre"
                    variant="outlined"
                    name="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    fullWidth
                  >
                    {Object.keys(genreList).map((key) => (
                      <MenuItem key={key} value={key}>
                        {genreList[key]}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  {/* Movie Poster URL */}
                  <TextField
                    type="text"
                    placeholder="Movie Poster URL /imgurl.jpg "
                    variant="outlined"
                    name="moviePoster"
                    value={posterUrl}
                    onChange={(e) => setMoviePoster(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  {/* Movie Backdrop URL */}
                  <TextField
                    type="text"
                    placeholder="Movie Backdrop URL : /imgurl.jpg "
                    variant="outlined"
                    name="movieBackdrop"
                    value={backdropUrl}
                    onChange={(e) => setMovieBackdrop(e.target.value)}
                    fullWidth
                  />
                </Grid>

                <Grid container spacing={1}>
                  <Grid item xs={7}>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onClear()}
                    >
                      Clear Fields
                    </Button>
                  </Grid>
                </Grid>
                <Grid></Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <br />
    </div>
  );
}

const genreList = {
  "Action Genre": "Action Genre",
  "Animation Genre": "Animation Genre",
  "Comedy Genre": "Comedy Genre",
  "Crime Genre": "Crime Genre",
  "Drama Genre": "Drama Genre",
  "Experimental Genre": "Experimental Genre",
  "Fantasy Genre": "Fantasy Genre",
  "Historical Genre": "Historical Genre",
  "Horror Genre": "Horror Genre",
  "Romance Genre": "Romance Genre",
  "Science Fiction Genre": "Science Fiction Genre",
  "Thriller Genre": "Thriller Genre",
  "Western Genre": "Western Genre",
  "Other Genres": "Other Genres",
};

export default AddMovie;
