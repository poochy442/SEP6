import React from 'react'
import { useSelector } from 'react-redux';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
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
	const movie = movieSelector ? movieSelector[parseInt(movieId, 10)] : null
	const reviews = movie && movie.reviews ? movie.reviews.map((element) => {
		return reviewSelector[element]
	}) : null;
	const reviewsComponent = reviews && reviews !== [] ? reviews.map((review, index) => {
		return (<ReviewDetails key={index} review={review} />)
	}) : (
		<p className='emptyText'>No reviews yet</p>
	)

	return (
		<div className='reviewList'>
			<h1 className='reviewHeader'>Reviews</h1>
			{reviewsComponent}
		</div>
	)
}

export default ReviewList