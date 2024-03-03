import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>Movies</span>
        </Link>

        <Link to="/addmovie" style={{ textDecoration: "none" }}>
          <span>Add a New Movie</span>
        </Link>
      </div>

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
      </div>
    </div>
  );
};

export default Header;
