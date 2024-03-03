import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  MenuItem, // Add MenuItem for dropdown
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";

function EditMovie() {
  const { id } = useParams();
  const [movieName, setMovieName] = useState("");
  const [ratings, setRatings] = useState("");
  const [votes, setVotes] = useState("");
  const [minutes, setMinutes] = useState("");
  const [releasedate, setReleasedate] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [genre, setGenre] = useState(""); // Add genre state
  const [moviePoster, setMoviePoster] = useState(""); // Add moviePoster state
  const [movieBackdrop, setMovieBackdrop] = useState(""); // Add movieBackdrop state
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = {
      "Id": id,
      "MovieName": movieName,
      "Rate": ratings,
      "Minutes": minutes,
      "Synopsis": synopsis,
      "PosterURL":moviePoster ,
      "Tagline": tagline,
      "Votes": votes,
      "ReleaseDate": releasedate,
      "Genre": genre,
      "BackdropURL": movieBackdrop
    };
    console.log(movieData);
    axios
      .put(
        `https://w9nbvf6p6e.execute-api.us-east-1.amazonaws.com/v1/update-movie`,
        movieData,
        {
          withCredentials: false,
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            // Add any other headers as needed
          },
        }
      )
      .then((response) => {
        console.log("Movie created:", response.data);
        // Optionally, you can reset the form fields after successful submission
        onClear();
      })
      .catch((error) => {
        console.error("Error creating movie:", error);
      });
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        axios
          .get(
            `https://w9nbvf6p6e.execute-api.us-east-1.amazonaws.com/v1/get-movie-by-id/${id}`
          )
          .then(function (response) {
            // handle success
            console.log(response.data);
            setMovieName(response.data.MovieName || "");
            setRatings(response.data.Rate || "");
            setVotes(response.data.Votes || "");
            setMinutes(response.data.Minutes || "");
            setReleasedate(response.data.ReleaseDate || "");
            setSynopsis(response.data.Synopsis || "");
            setGenre(response.data.Genre || "");
            setMoviePoster(response.data.PosterURL || "");
            setMovieBackdrop(response.data.BackdropURL || "");
            setTagline(response.data.Tagline || "");
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

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
              Edit
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
                    value={ratings}
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
                    name="min"
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
                    value={moviePoster}
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
                    value={movieBackdrop}
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

export default EditMovie;
