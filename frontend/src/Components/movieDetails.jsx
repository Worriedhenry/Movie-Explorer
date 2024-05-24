import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./loader";
export default function Movie() {

    // This component provides a detailed view of each movie/series/episode

    const [movie, setMovie] = React.useState(null);
    const {id}=useParams()

    // This effect is called whenever the id in the url changes
    // The effect fetches data from the OMDB API
    // The data is then set as the state of the movie
    useEffect(() => {
        axios.get(`https://www.omdbapi.com/?apikey=be6ccc3d&i=${id}`).then(response=>{
            console.log(response.data);
            setMovie(response.data)
        })
    }, [id]) // The effect is re-run whenever the id in the url changes
    


    if(!movie){
        return <div className="w-full "><Loader /></div>
    }
    return (
        <div className="flex md:flex-row space-y-4 flex-col px-2">

            <div className="md:w-1/3 flex justify-center">
                <img src={movie?.Poster} />
            </div>  

            <div className="md:w-2/3 md:pr-8 space-y-2 md:text-left  text-center">

                <h1 className="text-3xl font-bold">{movie?.Title}</h1>
                <p className="flex justify-center md:justify-start space-x-2 items-center"><img className="w-4 h-4" src="/star-icon.svg" /> <span>{movie?.imdbRating}/10 , {movie?.Runtime}</span> </p>
                
                <div>
                    <p>{movie?.Genre}</p>
                </div>

                <p>Released on {movie?.Released}</p>
                <p>{movie?.Plot}</p>

                <div className="divide-y">
                    <p><span className="font-semibold">Directors</span> : {movie?.Director}</p>
                    <p><span className="font-semibold">Writers</span> : {movie?.Writer}</p>
                    <p><span className="font-semibold">Actors</span> : {movie?.Actors}</p>
                    <p><span className="font-semibold">Awards</span> : {movie?.Awards}</p>
                    <p><span className="font-semibold">Language,country</span> : {movie?.Language},{movie?.Country}</p>
                    <p><span className="font-semibold">Box Office</span> : {movie?.BoxOffice}</p>
                </div>

                <div>
                    <p className="font-semibold text-lg">Ratings</p>
                    {movie?.Ratings?.map((rating) => <p>{rating.Source} : {rating.Value}</p>)}
                </div>

            </div>
        </div>
    )
}