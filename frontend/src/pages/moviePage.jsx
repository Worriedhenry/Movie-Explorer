import React from "react";
import Header from "../Components/header";
import Movie from "../Components/movieDetails";

export default function MoviePage() {
    return <div className="space-y-8">
        <Header />
        <Movie/>
    </div>
}