import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import WriteReview from "../components/cardIcons/writeReview";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";

const MustWatchPage = () => {
  const {mustWatchPage: movieIds } = useContext(MoviesContext);

  const mustWatchQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = mustWatchQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const movies = mustWatchQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });


  return (
    <PageTemplate
      title="mustwatch"
      movies={movies}
      action={(movie) => {
        return (
          <>
  <AddToMustWatchIcon movie={movie}/>      
           
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default MustWatchPage;