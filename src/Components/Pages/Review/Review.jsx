import React, { useState } from 'react'
import { useLocation } from 'react-router';
import MovieSearch from '../../Movie/MovieSearch';

import '../../../Styles/Pages/Review/Review.scss';
import MovieDetails from '../../Movie/MovieDetails';
import MovieReview from '../../Review/MovieReview';

const Review = () => {
	const location = useLocation();
	const passedMovie = location.state;
	const [movie, setMovie] = useState(passedMovie ? passedMovie : null);
	const [isReviewing, setIsReviewing] = useState(true);

	return (
		<div className='review'>
			{movie && isReviewing ? (
				<div className='movieReview'>
					<div className='backButton' onClick={() => setIsReviewing(false)}>X</div>
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