import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import MovieDetails from '../Movie/MovieDetails';
import ReviewList from '../Review/ReviewList';

import '../../Styles/Pages/Movie.scss';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';

function Movie() {
	const location = useLocation();
	const passedMovie = location.state;
	const [movie, setMovie] = useState(passedMovie ? passedMovie : null);
	const [isFetched, setIsFetched] = useState(false);

	// Ensure newest data
	useFirestoreConnect(['movies']);
	const movieSelector = useSelector((state) => state.firestore.data.movies)

	useEffect(() => {
		if(!isFetched && isLoaded(movieSelector)){
			const newMovie = movieSelector[movie.id];
			setMovie({...newMovie, id: movie.id});
			setIsFetched(true)
		}
	}, [movie, isFetched, movieSelector])


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
