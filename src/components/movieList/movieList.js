import React, { useEffect, useState } from "react";
import "./movieList.css";
import Cards from "../card/card";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch("https://w9nbvf6p6e.execute-api.us-east-1.amazonaws.com/v1/get-all-movies")
            .then((res) => res.json())
            .then((data) => {
                setMovieList(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
    };

    // Filter the movieList based on the search term
    const filteredMovies = movieList.filter(movie =>
        movie.MovieName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="movie__list">
            <div className="row-container">
                <h2 className="list__title">Discover Cinematic Wonders, Where Every Frame Tells a Tale.</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search"
                    onChange={handleSearch}
                    value={searchTerm}
                    className="search-input"
                />
                <span className="search-icon">
                    <i className="fa fa-search"></i>
                </span>
                <br/>
            </div>
            </div>
            <div className="list__cards">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
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
