
import React, { useEffect, useState } from "react";
import Home from "../../pages/home/home"; // Import the Home component or adjust the import path

const FilteredMovie = () => {
  const [allMovies, setAllMovies] = useState([]); // State to store all movies
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch all movies or use your existing data source
    fetch("https://w9nbvf6p6e.execute-api.us-east-1.amazonaws.com/v1/get-all-movies")
      .then((res) => res.json())
      .then((data) => setAllMovies(data));
  }, []); // Empty dependency array ensures this effect runs only once

  useEffect(() => {
    // Perform search logic when searchTerm changes
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const searchResults = allMovies.filter(
      (movie) =>
        movie.MovieName.toLowerCase().includes(lowerCaseSearchTerm) ||
        movie.Tagline.toLowerCase().includes(lowerCaseSearchTerm)
      // Add more fields if needed for searching
    );

    setFilteredMovies(searchResults);
  }, [searchTerm, allMovies]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      {/* Render search input */}
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Render other components or UI related to FilteredMovie page */}
      {/* Pass filteredMovies to the Home component */}
      <Home movies={filteredMovies} />
    </div>
  );
};

export default FilteredMovie;
