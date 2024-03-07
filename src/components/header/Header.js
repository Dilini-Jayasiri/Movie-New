import React, { useEffect, useState } from "react";
import "./Header.css";
import FilteredMovie from "./FilteredMovie";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user,setUser] = useState(null);
  const [movies,setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    fetch("https://w9nbvf6p6e.execute-api.us-east-1.amazonaws.com/v1/get-all-movies")
      .then((res) => res.json())
      .then((data) => { 
        setMovies(data);
        setFilteredMovies(data); // Assuming the response is an array directly

  });
 }, []);

  function handleSearch(e) {
    const term = e.target.value;
    setSearchTerm(term);
    const filteredMovies = movies.filter(movie =>
      movie.MovieName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredMovies(filteredMovies); // Update filteredMovies state
  }

  useEffect(() => {
    const token = localStorage.getItem(`token`);

    if(token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }else {
      setUser(null);
    }
    
  }, []);

  const handleSignOut = () => {
    // Clear the user object and token from local storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Set the user state to null
    setUser(null);
  };
  
  // console.log(token);
  // const user = localStorage.getItem(`user`);
  // const decode = jwtDecode(token);
  // const role =
  //   decode["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  // //const getrole = localStorage.getItem(role);
  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>Movies</span>
        </Link>

        {user && user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "1" &&  (
          <Link to="/addmovie" style={{ textDecoration: "none" }}>
            <span>Add Movie</span>
          </Link>
        )}
      </div>

     

      {/* <FilteredMovie movies={filteredMovies}/> */}

      <div className="headerRight">
        {user ? (
          <>
            <span className="username">
              Hi {user["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]}  
              </span>
            {/* <button onClick={handleSignOut} style={{ textDecoration: "none" }} className="auth-btn-signup">Sign Out</button> */}
            <span className="auth-btn-signup" onClick={handleSignOut}>&nbsp;Sign Out</span>
          </>
        ) : (
          <>
             <Link to="/signup" style={{ textDecoration: "none" }}>
          <span className="auth-btn-signup">Signup</span>
        </Link>

        <Link to="/login" style={{ textDecoration: "none" }}>
          <span className="auth-btn-login">Signin</span>
        </Link>
          </>
        
        )}
       
      </div>
    </div>
  );
};

export default Header;
