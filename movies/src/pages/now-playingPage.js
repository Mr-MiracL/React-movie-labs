import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getNowPlayings } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const NowPlayingPage = (props) => {

    const {  data, error, isLoading, isError }  = useQuery('discover', getNowPlayings)
  
    if (isLoading) {
      return <Spinner />
    }
  
    if (isError) {
      return <h1>{error.message}</h1>
    }
    const movies=data.results;

    const newFavorites=movies.filter(p=>p.newFavorites)
    localStorage.setItem('newFavorites', JSON.stringify(newFavorites))
  

    return(
        <PageTemplate
        title="NowPlaying Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
  );
};

export default NowPlayingPage;