import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import Spinner from "../spinner";  
import { getCredits } from "../../api/tmdb-api";  

const CreditsList = ({ movieId }) => {
  const { data: credits, error, isLoading, isError } = useQuery(
    ["credits", { id: movieId }],
    getCredits
  );

  // Loading and error states
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h6" color="error">{error.message}</Typography>;
  }

  // Reusable component for rendering Cast and Crew
  const renderCastOrCrew = (items, isCast = true) => (
    <Grid container spacing={2}>
      {items?.slice(0, 12).map((item) => (  // Show 12 items to fit in limited space
        <Grid item key={item.id} xs={6} sm={4} md={3}>  {/* Adjust grid to fit more actors */}
          <Card sx={{ maxWidth: 180 }}>  {/* Limit the width of each card */}
            {isCast && item.profile_path ? (
              <CardMedia
                component="img"
                height="180"  
                image={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                alt={item.name}
                sx={{ objectFit: "cover" }}  
              />
            ) : (
              <div style={{ height: 180, backgroundColor: "#ccc" }}></div>  // Placeholder for crew without image
            )}
            <CardContent sx={{ padding: 1 }}>
              <Typography variant="h6" component="div" noWrap>
                {isCast ? (
                  <Link to={`/actor/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {item.name}
                  </Link>
                ) : (
                  item.name
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {isCast ? `Character: ${item.character}` : `Job: ${item.job}`}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <div style={{ marginTop: "2rem", padding: "1rem" }}>
      {/* Cast Section */}
      <Typography variant="h5" component="h2" gutterBottom>
        Cast & Crew
      </Typography>

      <Typography variant="h6" component="h3" style={{ marginTop: "1rem" }}>
        Cast
      </Typography>
      {renderCastOrCrew(credits?.cast)}

      {/* Crew Section */}
      <Typography variant="h6" component="h3" style={{ marginTop: "2rem" }}>
        Crew
      </Typography>
      {renderCastOrCrew(credits?.crew, false)}
    </div>
  );
};

export default CreditsList;
