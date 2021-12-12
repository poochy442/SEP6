import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import MovieSearch from '../Movie/MovieSearch';

import '../../Styles/Pages/Review.scss';
import MovieDetails from '../Movie/MovieDetails';
import MovieReview from '../Review/MovieReview';
import { Link } from 'react-router-dom';

const Review = () => {
	const location = useLocation();
	const passedMovie = location.state;
	const initialMovie = passedMovie ? passedMovie : null;
	const [movie, setMovie] = useState(initialMovie);
	const [isReviewing, setIsReviewing] = useState(true);

	useEffect(() => {
		setIsReviewing(movie ? true : false)
	}, [movie])

	return (
		<div className='review'>
			{isReviewing && movie ? (
				<div className='movieReview'>
					<div className='backButton' onClick={() => setIsReviewing(false)}>X</div>
					<MovieDetails movie={movie} />
					<Link to='/movie' state={movie} className='movieButton'>See other reviews</Link>
					<h1 className='reviewHeader'>Review this movie</h1>
					<MovieReview movie={movie} />
				</div>
			) : (
				<div>
					<h1>What movie do you want to review?</h1>
					<MovieSearch setMovie={setMovie} isReviewing={true} />
				</div>
			)}
		</div>
	)
}

export default Review