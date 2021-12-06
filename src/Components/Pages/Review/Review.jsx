import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import MovieSearch from '../../Movie/MovieSearch';

import '../../../Styles/Pages/Review/Review.scss';
import MovieDetails from '../../Movie/MovieDetails';
import MovieReview from '../../Movie/MovieReview';

const Review = () => {
	const location = useLocation();
	const passedMovie = location.state;
	location.state = null;
	const [movie, setMovie] = useState(passedMovie ? passedMovie : null);
	

	useEffect(() => {
		console.log('Review movie: ', movie);
	}, [movie])

	return (
		<div className='review'>
			{movie ? (
				<div className='movieReview'>
					<MovieDetails movie={movie} />
					<h1 className='reviewHeader'>Review this movie</h1>
					<MovieReview movie={movie} />
				</div>
			) : (
				<div>
					<h1>Movie Search</h1>
					<MovieSearch movie={movie} setMovie={setMovie} isReviewing={true} />
				</div>
			)}
		</div>
	)
}

export default Review