import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import MovieSearch from '../../Movie/MovieSearch';

import '../../../Styles/Pages/Review/Review.scss';

const Review = () => {
	const location = useLocation();
	const passedMovie = location.state;
	const [movie, setMovie] = useState(passedMovie ? passedMovie : null);

	useEffect(() => {
		console.log('Review movie: ', movie);
	}, [movie])

	return (
		<div className='review'>
			{movie ? (
				<div className='movieReview'>
					<div className='movieDetails'>
						<img className='movieImage' src={'https://image.tmdb.org/t/p/w500' + movie.imgURL} alt='Movie poster' />
						<p className='movieTitle'>{movie.title}</p>
					</div>
				</div>
			) : (
				<div>
					<h1>Movie</h1>
					<MovieSearch movie={movie} setMovie={setMovie} />
				</div>
			)}
		</div>
	)
}

export default Review