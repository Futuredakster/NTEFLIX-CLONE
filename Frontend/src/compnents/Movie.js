import { FaHeart, FaRegHeart } from 'react-icons/fa';
import React, { useState } from 'react';
import axios from "axios";

function Movie({ item}) {
  const [like, setLike] = useState(false);
 const id= item.id;
 const accessToken = localStorage.getItem("accessToken");
 const handleLikeClick = () => {
  axios.post("http://localhost:3001/users/Movieid", { movie_id: id }, {
    headers: {
      accessToken: accessToken,
    }
  })
    .then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
       
        setLike(!like);
      }
    })
    .catch((error) => {
      console.error('Error updating user:', error);
      // Handle error, e.g., show an error message to the user
    });
  
};

  return (
    <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
      <img
        className='w-full h-auto block'
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
        <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center'>
          {item?.title}
        </p>
        {like ? (
          <FaHeart
            onClick={handleLikeClick}
            className='absolute top-4 left-4 text-red-600'
          />
        ) : (
          <FaRegHeart
            onClick={handleLikeClick}
            className='absolute top-4 left-4 text-gray-300'
          />
        )}
      </div>
    </div>
  );
        }
        export default Movie;
