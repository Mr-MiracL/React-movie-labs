import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import { getNowPlayings } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';

const NowPlayingPage = (props) => {

    const {  data, error, isLoading, isError }  = useQuery('discovery', getNowPlayings)
  
    if (isLoading) {
      return <Spinner />
    }
  
    if (isError) {
      return <h1>{error.message}</h1>
    }
    const movies=data.results;

    const newFavorites=movies.filter(p=>p.newFavorites)
    localStorage.setItem('newFavorites', JSON.stringify(newFavorites))
    const addToFavorites=(movieId)=>true

    return(
        <PageTemplate
        title="Discover Movies"
        movies={movies}
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />
        }}
      />
  );
};

export default NowPlayingPage;