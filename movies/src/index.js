import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import MustWatchPage from "./pages/mustWatchPage";
import NowPlayingPage from "./pages/now-playingPage";
import PopularPage from "./pages/popularPage";
import ActorPage from "./pages/actorPage";
import CreditsList from "./components/movieCredits";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={ <Navigate to="/" /> } />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/movies/mustWatch" element={<MustWatchPage />} />
            <Route path="/movies/nowplaying" element={<NowPlayingPage />} />
            <Route path="/movies/popular" element={<PopularPage />} />
            <Route path="/actor/:id" element={<ActorPage />} />
            <Route path="/movie/:movieId/credits" element={<CreditsList />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);