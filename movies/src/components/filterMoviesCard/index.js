import { getCountries, getGenres,getLanguages} from "../../api/tmdb-api";
import React, {useState, useEffect}  from "react";
import Card from "@mui/material/Card";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'

const formControl = {
  margin: 1,
  minWidth: "90%",
  backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterMoviesCard(props) {
  // Fetch genres
  const { data: genresData, error: genresError, isLoading: isGenresLoading, isError: isGenresError } = useQuery("genres", getGenres);

  const { data: languagesData, error: languagesError, isLoading: isLanguagesLoading, isError: isLanguagesError } = useQuery(
    "languages", 
    getLanguages
  );

  if (isGenresLoading || isLanguagesLoading) {
    return <Spinner />;
  }

  if (isGenresError || isLanguagesError) {
    return <h1>{genresError?.message || languagesError?.message}</h1>;
  }


  const genres = genresData.genres;
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // Pass the value back to the parent component
  };

  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleLanguageChange = (e) => {
    handleChange(e, "language", e.target.value);
  };

  return (
    <Card sx={{ backgroundColor: "rgb(204, 204, 0)" }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        
      
        <TextField
          sx={{ ...formControl }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />

      
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>


        <FormControl sx={{ ...formControl }}>
          <InputLabel id="language-label">Language</InputLabel>
          <Select
            labelId="language-label"
            id="language-select"
            defaultValue=""
            value={props.languageFilter}
            onChange={handleLanguageChange}
          >
            {languagesData.map((language) => {
              return (
                <MenuItem key={language.id} value={language.id}>
                  {language.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </CardContent>

      <CardMedia
        sx={{ height: 300 }}
        image={img} 
        title="Filter"
      />
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
      </CardContent>
    </Card>
  );
}