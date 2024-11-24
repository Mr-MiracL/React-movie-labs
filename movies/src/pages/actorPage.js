import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails, getActorMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";



const ActorPage = () => {
    const { id } = useParams();
  
    // Query actor details
    const { data: actor, isLoading: isActorLoading, isError: isActorError, error: actorError } = useQuery(
      ["actor", { id }],
      () => getActorDetails(id)
    );
  
    // Query movies the actor participated in
    const { data: movies, isLoading: isMoviesLoading, isError: isMoviesError, error: moviesError } = useQuery(
      ["actorMovies", { id }],
      () => getActorMovies(id)
    );
  
    // Loading and error states
    if (isActorLoading || isMoviesLoading) {
      return <Spinner />;
    }
  
    if (isActorError || isMoviesError) {
      return <Typography variant="h6" color="error">{actorError?.message || moviesError?.message}</Typography>;
    }
  
    return (
      <div style={{ padding: "1rem" }}>
        {/* Actor Information Section */}
        <Typography variant="h4" gutterBottom>
          {actor.name}
        </Typography>
        <img
          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
          alt={actor.name}
          style={{ width: "300px", borderRadius: "10px" }}
        />
        <Typography variant="body1" gutterBottom>
          {actor.biography || "No biography available."}
        </Typography>
  
        {/* Movies Section */}
        <Typography variant="h6" gutterBottom>
          Movies
        </Typography>
        <Grid container spacing={3}>
          {movies?.cast?.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                      {movie.title}
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Release Date: {movie.release_date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
  };
  
  export default ActorPage;