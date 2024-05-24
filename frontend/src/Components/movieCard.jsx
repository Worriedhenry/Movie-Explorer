import React from "react";
import { useNavigate } from "react-router-dom";
export default function MovieCard ({ movie }) {

    // Following component handle the view of each movie card in the search results
    
    const navigate = useNavigate()
    return (
        <div className="max-w-sm w-[20rem] flex  lg:max-w-full lg:flex cursor-pointer" onClick={() => navigate(`/movie/${movie.imdbID}`)} >
            <img src={movie.Poster} alt="Movie Poster" className="h-48 w-full object-cover object-center lg:h-auto lg:w-36" />
            <div class="border-2 border-gray-400  w-full lg:border-gray-400 bg-gray-700 rounded-b  p-4 flex flex-col justify-between leading-normal">
                <div class="mb-8 w-full">
                    <p class="text-white text-xs">{movie.imdbID}</p>
                    <div class="text-white font-bold text-xl mb-2">{movie.Title}</div>
                    <p class="text-sm text-white flex items-center">
                        {movie.Type}.{movie.Year}
                    </p>
                </div>
            </div>
        </div>
    )
}