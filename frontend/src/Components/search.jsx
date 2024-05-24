import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom"
import Loader from "./loader";
import MovieCard from "./movieCard";
export default function Search() {
    const [data, setData] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [totalResults, setTotalResults] = React.useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = React.useState(searchParams.get("q") || "");
    const [search, setSearch] = React.useState(searchParams.get("q") || "");
    const [movieType, setMovieType] = React.useState("");
    const [movieYear, setMovieYear] = React.useState("");
    const [loading,setLoading]=React.useState(false);
    const apiKey = "be6ccc3d";



    /**
     * This effect is used to fetch data from the OMDB API and set the state
     * of the data and totalResults.
     * The effect is run whenever the query, movieType, movieYear or page changes.
     * The effect fetches data from the OMDB API and sets the state of the data
     * and totalResults.
     */
    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true)
        axios.get(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}&type=${movieType}&y=${movieYear}`).then(
            (response) => {
                setData(response.data?.Search);
                setTotalResults(response.data?.totalResults);
                setLoading(false)
            }
        ).catch((err) => console.log(err))
    }, [query, searchParams.get("q"), page, movieType, movieYear])


    /**
     * Handles the form submission
    */
    const handleSubmit = async (e) => {
        /**
         * Prevent the default form submission behavior
         */
        e.preventDefault();
        /**
         * Set the query to the value of the search input
         */
        setQuery(search);
        /**
         * Reset the page to the first page of results
         */
        setPage(1);
        /**
         * Update the search params to include the new query
         */
        setSearchParams({ q: search });
    }

    /**
     * Handles the change of the movie year input
     */
    const handleYearChange = (year) => {
        /**
         * Reset the page to the first page of results and set the data to null
         */
        setPage(1);
        setData(null)
        /**
         * Update the movie year to the new value
         */
        setMovieYear(year);
    }

    /**
     * Handles the change of the movie type input  
     */ 
    const handleTypeChange = (type) => {
        /**
         * Reset the page to the first page of results and set the data to null
         */
        setPage(1);
        setData(null)
        /**
         * Update the movie type to the new value
         */
        setMovieType(type);
    }
    return (<>

        <form onSubmit={(e) => handleSubmit(e)} className="max-w-md mx-auto">
            <div className="relative">

                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>

                <input type="search" id="default-search" value={search} onChange={e => setSearch(e.target.value)} className="block w-full p-4 ps-10 text-sm  border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Search movies" required />

                <button type="submit" className="text-white absolute end-2.5 bottom-2.5  font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">Search</button>

            </div>
        </form>

        <div className=" flex flex-col items-center space-y-4 ">
            <form>

                <div className="space-x-4">
                    <select value={movieType}  onChange={(e) => handleTypeChange(e.target.value)} className="form-select bg-gray-700  p-2"   >
                        <option disabled value="" >Type</option>
                        <option value="">All</option>
                        <option value="movie">Movie</option>
                        <option value="series">Series</option>
                        <option value="episode">Episode</option>
                    </select>
                    <input type="Number" value={movieYear} onChange={(e) => handleYearChange(e.target.value)} className="form-select w-36 bg-gray-700 p-2" placeholder="enter year" min={1950} max={2024} />
                </div>

            </form>
            {query.length == 0 ? <p className="text-center text-gray-400">Search your favorite movies</p> : null}

            {query.length > 0 && !loading && !data ? <p className="text-center text-gray-400">No movies found with keyword "{query}"</p> : null}

            {data && <p className="text-center text-gray-400">showing {(page - 1) * 10 + 1} to {page * 10 > totalResults ? totalResults : page * 10} of {totalResults} movies found</p>}

            {loading && <Loader />}
            {data && data?.map((movie) => <MovieCard movie={movie} />)}

            {data && <div>

                <div className="flex">
                    {page != 1 && <button onClick={() => setPage(page - 1)} className="flex fixed bottom-2.5 left-0 md:left-[25%] items-center justify-center px-3 h-8 text-sm font-medium  bg-gray-800 border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-white">
                        Previous
                    </button>}
                    {page * 10 < totalResults && <button onClick={() => setPage(page + 1)} className="flex items-center fixed bottom-2.5 md:right-[25%] right-0 justify-center px-3 h-8 ms-3 text-sm font-medium  bg-gray-800 dark:border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-white">
                        Next
                    </button>}
                </div>

            </div>}
        </div>
    </>
    )
}

