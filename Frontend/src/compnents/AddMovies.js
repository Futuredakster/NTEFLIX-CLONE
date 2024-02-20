import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';

const AddMovies = ({ fetchURL }) => {
  const [movies, setMovies] = useState([]);
  const [id, setId] = useState(null);
  const [userMovies, setUserMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletedMovies, setDeletedMovies] = useState([]);

  const handleDelete = (movieId) => {
    // Retrieve existing userMovies from local storage
    const storedUserMovies = JSON.parse(localStorage.getItem("userMovies")) || [];
  
    // Filter out the movie to be deleted
    const updatedUserMovies = storedUserMovies.filter((movie) => movie.id !== movieId);
  
    // Update local storage and state after a short delay
    setTimeout(() => {
      localStorage.setItem("userMovies", JSON.stringify(updatedUserMovies));
      setUserMovies(updatedUserMovies);
      setDeletedMovies([...deletedMovies, movieId]); // Mark the movie as deleted
    }, 100); // Adjust the delay as needed
  };
  // Fetch movie data
  useEffect(() => {
    axios.get(fetchURL)
      .then((response) => {
        setMovies(response.data.results);
         console.log("Component is mounted");
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, [fetchURL]);

  // Fetch user movie_id
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    axios.get('http://localhost:3001/users/id', {
      headers: {
        accessToken: accessToken,
      },
    })
      .then((response) => {
        setId(response.data.movie_id);
        setLoading(false);
         console.log("Component is done");
      })
      // hello
      .catch((error) => {
        console.error('Error fetching user movie_id:', error);
        setLoading(false);
      });
  }, [id]); // Empty dependency array to run only once on component mount

  useEffect(() => {
    if (!loading) {
      // Retrieve existing userMovies from local storage or initialize an empty array
      const storedUserMovies = JSON.parse(localStorage.getItem("userMovies")) || [];
      console.log('Stored User Movies:', storedUserMovies);

      // Filter out deleted movies
      const filteredUserMovies = storedUserMovies.filter((movie) => !deletedMovies.includes(movie.id));

      // Find the selected movie
      const userMovie = movies.find((movie) => movie.id === id);

      if (userMovie) {
        // Check if the movie is not already in the array before adding
        if (!filteredUserMovies.some((storedMovie) => storedMovie.id === userMovie.id)) {
          filteredUserMovies.push(userMovie);

          // Update local storage
          localStorage.setItem("userMovies", JSON.stringify(filteredUserMovies));

          // Update state to trigger re-render
          setUserMovies(filteredUserMovies);
        } else {
          console.log('Movie is already in userMovies array');
          // Update state with existing movies (no change)
          setUserMovies(filteredUserMovies);
          console.log(userMovies);
        }
      }
    }
  }, [id, movies, loading, deletedMovies]);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  return (
     <div className="text-white">
    {/* Display user movies */}
    {userMovies.map((movie) => (
      <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2' key={movie?.id}>
        {movie && movie.backdrop_path ? (
          <img
            className='w-full h-auto block'
            src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt={movie.title}
          />
        ) : (
          <p>No image available</p>
        )}
        <p>{movie?.title}</p>
        <FaTrash
            onClick={() => handleDelete(movie.id)}  
            className='absolute top-4 left-4 text-gray-300 cursor-pointer'
          />
      </div>
    ))}

    {/* Your existing code for displaying the current movie */}
  </div>
  );
};

export default AddMovies;
