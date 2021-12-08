import React from 'react'
import { useSelector } from 'react-redux';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import MovieDetails from '../Movie/MovieDetails';
import ReviewDetails from './ReviewDetails';

import '../../Styles/Review/ReviewList.scss';

const ReviewList = (props) => {
	const {movieId} = props;
	useFirestoreConnect(['reviews', 'movies']);
	const movieSelector = useSelector((state) => state.firestore.data.movies)
	const reviewSelector = useSelector((state) => state.firestore.data.reviews)

	// Ensure the selector has loaded
	if(!isLoaded(movieSelector) || !isLoaded(reviewSelector)) return <div className='loading'>Loading...</div>

	// Configure data
	const movie = movieSelector[parseInt(movieId)]
	const reviews = movie.reviews.map((element) => {
		return reviewSelector[element]
	})
	console.log(movie, reviews)
	const reviewsComponent = reviews !== [] ? reviews.map((review, index) => {
		console.log(review)
		return (<ReviewDetails key={index} review={review} />)
	}) : (
		<p>No reviews yet</p>
	)

	return (
		<div className='reviewList'>
			<MovieDetails movie={movie} />
			<h1 className='reviewHeader'>Reviews</h1>
			{reviewsComponent}
		</div>
	)
}

export default ReviewList