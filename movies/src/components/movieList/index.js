import React from "react";
import Movie from "../movieCard/";
import Grid from "@mui/material/Grid2";

const MovieList = (props) => {
  let movieCards = props.movies.map((m) => (
    <Grid key={m.id} size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} sx={{padding: "20px"}}>
      <Movie key={m.id} movie={m} />
    </Grid>
  ));
  return movieCards;
};

export default MovieList;