
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails, getActorMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";


const ActorInfo = ({ actor }) => {
  return (
    <div style={{ padding: "1rem", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
        {actor.name}
      </Typography>
      <img
        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
        alt={actor.name}
        style={{
          width: "300px",
          borderRadius: "15px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      />
      <Typography variant="body1" gutterBottom style={{ marginTop: "1rem", fontStyle: "italic" }}>
        {actor.biography || "No biography available."}
      </Typography>
    </div>
  );
};


const MovieCard = ({ movie }) => {
  return (
    <Grid item key={movie.id} xs={12} sm={6} md={4}>
      <Card style={{ boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)", transition: "transform 0.2s ease-in-out" }}>
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h6" component="div" style={{ fontWeight: "bold", color: "#333" }}>
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              {movie.title}
            </Link>
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ marginTop: "0.5rem" }}>
            Release Date: {movie.release_date}
            title : {movie.title}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

// 
const ActorPage = () => {
  const { id } = useParams();

  // get info
  const {
    data: actor,
    isLoading: isActorLoading,
    isError: isActorError,
    error: actorError,
  } = useQuery(["actor", { id }], () => getActorDetails(id));

  // get movies
  const {
    data: movies,
    isLoading: isMoviesLoading,
    isError: isMoviesError,
    error: moviesError,
  } = useQuery(["actorMovies", { id }], () => getActorMovies(id));

 
  if (isActorLoading || isMoviesLoading) {
    return <Spinner />;
  }

  if (isActorError || isMoviesError) {
    return <Typography variant="h6" color="error">{actorError?.message || moviesError?.message}</Typography>;
  }

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f5f5f5" }}>
      
      <ActorInfo actor={actor} />
      <Typography variant="h6" gutterBottom style={{ marginTop: "2rem", fontWeight: "bold" }}>
        Movies
      </Typography>
      <Grid container spacing={3}>
        {movies?.cast?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </div>
  );
};

export default ActorPage;