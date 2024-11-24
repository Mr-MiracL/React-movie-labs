
import React, { useState } from 'react';
import { useQuery } from 'react-query'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Spinner from '../spinner'; 
import { Link } from 'react-router-dom';
import { getAddRate } from '../../api/tmdb-api';
import StarRating from '../movieRating';


export default function MovieRatings({ movie = { id: 1034541, title: 'ALL' } }) {

   
  const { data, error, isLoading, isError } = useQuery(
    ['ratings', { id: movie.id }],
    getAddRate
  );
  const [rating, setRating] = useState(0);
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
 
  const ratings = data.results;
  return (
    <div>
      <h2>Rate the movie: {movie}</h2>
      <StarRating rating={rating} setRating={setRating} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="ratings table">
          <TableHead>
            <TableRow>
              <TableCell>Rater</TableCell>
              <TableCell align="center">Rating</TableCell>
              <TableCell align="right">More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ratings.map((r) => (
              <TableRow key={r.state}>
                <TableCell component="th" scope="row">
                  {r.rater} {}
                </TableCell>
                <TableCell align="center">{r.rating} / 5</TableCell> {}
                <TableCell align="right">
                  <Link
                    to={`/ratings/${r.state}`}
                    state={{
                      rating: r,
                      movie: movie,
                    }}
                  >
                    Full Rating Details
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
