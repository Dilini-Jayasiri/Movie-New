import React, { useEffect, useState } from "react";
import "./movieList.css";
import Cards from "../card/card";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch("https://w9nbvf6p6e.execute-api.us-east-1.amazonaws.com/v1/get-all-movies")
            .then((res) => res.json())
            .then((data) => {
                setMovieList(data);
                console.log(data)
            })
            
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    return (
        <div className="movie__list">
            <h2 className="list__title">MOVIES</h2>
            <div className="list__cards">
                {movieList.length > 0 ? (
                    movieList.map((movie) => (
                        <Cards key={movie.Id} movie={movie} />
                    ))
                ) : (
                    <p>No movies available</p>
                )}
            </div>
        </div>
    );
};

export default MovieList;
