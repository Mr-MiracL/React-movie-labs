import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getUpcomingMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import WriteReview from "../components/cardIcons/writeReview";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";

const MustWatchPage = () => {
  const { mustWatchPage: movieIds } = useContext(MoviesContext);

  // 确保 movieIds 是一个数组，如果不是则设置为默认空数组
  const movieIdsSafe = Array.isArray(movieIds) ? movieIds : [];

  // 始终调用 useQueries，不在条件语句中调用
  const mustWatchQueries = useQueries(
    movieIdsSafe.map((movieId) => ({
      queryKey: ["movie", { id: movieId }],
      queryFn: getUpcomingMovie,
    }))
  );

  // Debugging the queries status
  console.log("mustWatchQueries:", mustWatchQueries);

  // Check if any of the parallel queries is still loading.
  const isLoading = mustWatchQueries.find((m) => m.isLoading === true);

  // If there is any loading query, show a loading spinner
  if (isLoading) {
    return <Spinner />;
  }

  // Check if we have data or if any query failed
  const hasError = mustWatchQueries.some((q) => q.isError);

  if (hasError) {
    console.error("One or more queries failed:", mustWatchQueries.filter(q => q.isError));
    return <div>Error loading data. Please try again later.</div>;
  }

  const movies = mustWatchQueries.map((q, index) => {
    const data = q.data;

    // Ensure data is valid and genres exist
    if (data && Array.isArray(data.genres)) {
      data.genre_ids = data.genres.map((g) => g.id);
    } else {
      // Fallback if data or genres is invalid
      console.warn(`Invalid data for movie ID ${movieIdsSafe[index]}`, data);
      data.genre_ids = [];  // Fallback to empty array if genres are not available
    }

    return data;
  });

  return (
    <PageTemplate
      title="mustwatch"
      movies={movies}
      action={(movie) => (
        <>
          <AddToMustWatchIcon movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default MustWatchPage;

