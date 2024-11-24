import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import MovieRating from "../movieRating";


const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  // Don't miss this!
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [rating, setRating] = useState(0);

  
  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper component="ul" sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", listStyle: "none", padding: 1.5, margin: 0 }}>
        <li>
          <Chip label="Production Countries" sx={{ margin: 0.5 }} color="primary" />
        </li>
        {movie.production_countries.map((country) => (
          <li key={country.name}>
            <Chip label={country.name} sx={{ margin: 0.5 }} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", listStyle: "none", padding: 1.5, margin: 0 }}>
        <li>
          <Chip label="Original language" sx={{ margin: 0.5 }} color="primary" />
        </li>
            <Chip label={`${movie.original_language}`} sx={{ margin: 0.5 }} />
          
      </Paper>
      
      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen('reviews')}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen('rating')}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '10em'
        }}
      >
        <NavigationIcon />
        StarRate
      </Fab>
      <Drawer
        anchor="top"
        open={drawerOpen !== false} 
        onClose={() => setDrawerOpen(false)} 
      >
        {drawerOpen === 'reviews' ? (
          <MovieReviews movie={movie} />
        ) : drawerOpen === 'rating' ? (
          <div style={{ padding: '20px' }}>
           
            <MovieRating
              name="movie-rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)} 
            />
            
          </div>
        ) : null}
      </Drawer>

      </>
  );
};

export default MovieDetails ;