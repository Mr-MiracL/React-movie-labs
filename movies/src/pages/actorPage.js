import { useState } from "react";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getActorDetails, getActorMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from '@mui/icons-material/Favorite'


const ActorInfo = ({ actor }) => {
    const [likes, setLikes] = useState(0);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };
    return (
      <div style={{ padding: "2rem", textAlign: "center", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', fontSize: '2rem' }}>
          {actor.name}
        </Typography>
        <img
          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
          alt={actor.name}
          style={{
            width: "300px",
            borderRadius: "15px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            marginBottom: "1rem"
          }}
        />
        <Typography variant="body1" gutterBottom sx={{ marginTop: "1rem", fontStyle: "italic", fontSize: "1rem" }}>
          {actor.biography || "No biography available."}
        </Typography>
        <div style={{ marginTop: '1rem' }}>
        <IconButton 
          onClick={handleLikeClick} 
          sx={{ color: "#007bff", '&:hover': { color: "#0056b3" } }}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography variant="body2" sx={{ fontSize: "1rem", display: "inline-block", marginLeft: "0.5rem" }}>
          {likes} Likes
        </Typography>
      </div>
    </div>
  );
};
  
  
  const MovieCard = ({ movie }) => {
    return (
      <Grid item key={movie.id} xs={12} sm={6} md={4}>
        <Card sx={{
          boxShadow: 3,
          transition: "transform 0.3s ease-in-out",
          '&:hover': {
            transform: 'scale(1.05)', 
            boxShadow: 6,  
          }
        }}>
          <CardMedia
            component="img"
            height="300"
            image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <CardContent sx={{ padding: 2 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: "bold", color: "#333", fontSize: "1.2rem" }}>
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                {movie.title}
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: "0.5rem", fontSize: "1rem" }}>
              Release Date: {movie.release_date}
              title: {movie.title}
              
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };
  
  const ActorPage = () => {
    const { id } = useParams();
  
    const {
      data: actor,
      isLoading: isActorLoading,
      isError: isActorError,
      error: actorError,
    } = useQuery(["actor", { id }], () => getActorDetails(id));
  
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
      return   <h1>{isActorError?.message || isMoviesError?.message}</h1>;
    }
  
    return (
      <div style={{ padding: "2rem", backgroundColor: "#f5f5f5" }}>
        <ActorInfo actor={actor} />
        <Typography variant="h6" gutterBottom sx={{ marginTop: "2rem", fontWeight: "bold", fontSize: "1.5rem" }}>
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
  