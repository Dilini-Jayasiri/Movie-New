import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://w9nbvf6p6e.execute-api.us-east-1.amazonaws.com/v1/get-all-movies")
      .then((res) => res.json())
      .then((data) => setMovies(data)); // Assuming the response is an array directly
  }, []);

  return (
    <>
      <div className="poster">
      <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {movies.map((movie) => (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.Id}`}
            >
              <div className="posterImage">
                <img
                  src={movie && movie.BackdropURL
                  }
                />
              </div>
              <div className="posterImage__overlay">
                <div className="posterImage__title">
                  {movie ? movie.MovieName : ""}
                </div>
                <div className="posterImage__runtime">
                  {movie ? movie.ReleaseDate : ""}
                  <span className="posterImage__rating">
                    {movie ? movie.Votes : ""}
                    <i className="fas fa-star" />{" "}
                  </span>
                </div>
                <div className="posterImage__tagline">
                  {movie ? movie.Tagline : ""}
                </div>
                

                {/* <div className="posterImage__description">
                  {movie ? movie.PosterURL : ""}
                </div> */}
              </div>
            </Link>
          ))}
        </Carousel>
        {/* <MovieList /> */}
      </div>
    </>
  );
};

export default Home;
