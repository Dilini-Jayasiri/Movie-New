import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = () => {
    fetch(
      `https://w9nbvf6p6e.execute-api.us-east-1.amazonaws.com/v1/get-movie-by-id/${id}`
    )
    
      .then((res) => res.json())
      .then((data) => {
        console.log("Received data:", data); // Log the received data
        setMovie(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={
            currentMovieDetail ? currentMovieDetail.BackdropURL: ""
          }
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          {/* <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail ? currentMovieDetail.PosterURL : ""
              }`}
            />
          </div> */}
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail ? currentMovieDetail.MovieName : ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail ? currentMovieDetail.Tagline : ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.Rate : ""}{" "}
              <i class="fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetail
                  ? "(" + currentMovieDetail.Votes + ") votes"
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail ? currentMovieDetail.Minutes + " mins" : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail
                ? "Release date: " + currentMovieDetail.ReleaseDate
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.Genre.map((genres) => (
                    <>
                      <span className="movie__genre" id={genres.id}>
                        {genres.name}
                      </span>
                    </>
                  ))
                : ""}
            </div>
          </div>
          {/* <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail ? currentMovieDetail.Synopsis : ""}</div>
          </div>  */}
        </div>
      </div>
      <div className="movie__links">
        <Link to={`/update-movie/${id}`} style={{ textDecoration: "none" }}>
          <p>
            <span className="movie__imdbButton movie__Button">
              Edit Movie <i className="newTab fas fa-external-link-alt"></i>
            </span>
          </p>
        </Link>
        <a href={""} target="_blank" style={{ textDecoration: "none" }}>
          <p>
            <span className="movie__homeButton movie__Button">
              Delete Movie<i className="newTab fas fa-external-link-alt"></i>
            </span>
          </p>
        </a>
      </div>
    </div>
  );
};

export default Movie;
