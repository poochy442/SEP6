import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import MovieDetails from '../Movie/MovieDetails';
import MovieSearch from '../Movie/MovieSearch';
import CommentList from '../Comment/CommentList';
import ReviewDetails from '../Review/ReviewDetails';

import '../../Styles/Pages/Comment.scss';
import MovieComment from '../Comment/MovieComment';

const Comment = () => {
	const location = useLocation();
	const passedMovie = location.state;
	const initialMovie = passedMovie ? passedMovie : null;
	const [movie, setMovie] = useState(initialMovie);
	useFirestoreConnect(['reviews']);
	const reviewSelector = useSelector((state) => state.firestore.data.reviews)
	const uidSelector = useSelector((state) => state.firebase.auth.uid);
	const [userReview, setUserReview] = useState(null);

	useEffect(() => {
		if(isLoaded(reviewSelector) && isLoaded(uidSelector)){
			const reviews = Object.values(reviewSelector);
			reviews.forEach(element => {
				if(element.reviewerId === uidSelector)
					setUserReview(element);
			});
		}
	}, [reviewSelector, uidSelector])

	const reviewContainer = userReview ? (
		<div className='reviewComponent'>
			<h1>Your review</h1>
			<ReviewDetails review={userReview} />
		</div>
		) : <p>No review</p>;

	return (
		<div className='comment'>
			{movie ? (
				<div className='commentComponent'>
					<MovieDetails movie={movie} />
					{reviewContainer}
					<MovieComment movie={movie} />
					<CommentList movieId={movie.id} />
				</div>
			) : (
				<div className='commentComponent'>
					<h1 className='commentTitle'>What movie do you want to discuss?</h1>
					<MovieSearch setMovie={setMovie} isCommenting={true} />
				</div>
			)}
		</div>
	)
}

export default Comment
