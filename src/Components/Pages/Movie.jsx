import React, { useState } from 'react'
import { Navigate, useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import MovieDetails from '../Movie/MovieDetails';
import ReviewList from '../Review/ReviewList';

import '../../Styles/Pages/Movie.scss';

function Movie() {
	const location = useLocation();
	const passedMovie = location.state;
	const [movie] = useState(passedMovie ? passedMovie : null);

	const movieComponent = movie ? (
		<div className='movieComponent'>
			<MovieDetails movie={movie} />
			<Link to='/review' state={movie} className='reviewButton'>Review the movie</Link>
			<ReviewList movieId={movie.id} />
		</div>
	) : <Navigate to='/' />
		
	return (
		<div className='moviePage'>
			{movieComponent}
		</div>
	)
}

export default Movie
