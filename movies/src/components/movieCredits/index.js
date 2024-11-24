import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Grid, Card, CardMedia, CardContent, Typography, } from "@mui/material";
import Spinner from "../spinner";  
import { getCredits } from "../../api/tmdb-api";  

const CreditsList = ({ movieId }) => {
  const { data: credits, error, isLoading, isError } = useQuery(
    ["credits", { id: movieId }],
    getCredits
  );

  
  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  
  const renderCastOrCrew = (items, isCast = true) => (
    <Grid container spacing={3}>  
      {items?.slice(0, 12).map((item) => (
        <Grid item key={item.id} xs={6} sm={4} md={3}>  
          <Card sx={{ 
            maxWidth: 180, 
            boxShadow: 3,   
            transition: 'transform 0.3s',  
            '&:hover': {
              transform: 'scale(1.05)', 
              boxShadow: 6,  
            }
          }}>  
            {isCast && item.profile_path ? (
              <CardMedia
                component="img"
                height="180"  
                image={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                alt={item.name}
                sx={{
                  objectFit: "cover", 
                  borderRadius: "8px",  
                }}  
              />
            ) : (
              <div style={{ height: 180, backgroundColor: "#ccc", borderRadius: "8px" }}></div>  
            )}
            <CardContent sx={{ padding: 1 }}>
              <Typography variant="h6" component="div" sx={{ 
                fontWeight: 600,  
                lineHeight: 1.2,  
                overflow: 'hidden', 
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap', 
              }}>
                {isCast ? (
                  <Link to={`/actor/${item.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {item.name}
                  </Link>
                ) : (
                  item.name
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{
                lineHeight: 1.4,  // Improve readability of secondary text
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
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
      <Typography variant="h5" component="h2" sx={{
        fontWeight: 700,  
        marginBottom: "1rem",  
      }}>
        Actors & Crew
      </Typography>
  
     
      <Typography variant="h6" component="h3" sx={{
        marginTop: "1rem", 
        fontWeight: 600,  
        fontSize: "1.2rem",  
        lineHeight: 1.3,
      }}>
        Actors
      </Typography>
      {renderCastOrCrew(credits?.cast)}
  
     
      <Typography variant="h6" component="h3" sx={{
        marginTop: "2rem", 
        fontWeight: 600, 
        fontSize: "1.2rem", 
        lineHeight: 1.3,
      }}>
        Crew
      </Typography>
      {renderCastOrCrew(credits?.crew, false)}
    </div>
  );
}

export default CreditsList;
