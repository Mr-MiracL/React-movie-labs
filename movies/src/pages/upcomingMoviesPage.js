import React from "react";

import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
import { getUpcomingMovies } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const UpcomingMoviePage = (props) => {
    
    const { data: movie, error, isLoading, isError } = useQuery(
      "discover", getUpcomingMovies
    )

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default UpcomingMoviePage;