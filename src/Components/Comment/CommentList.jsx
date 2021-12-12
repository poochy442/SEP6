import React from 'react'
import { useSelector } from 'react-redux';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase';
import CommentDetails from './CommentDetails';

import '../../Styles/Comment/CommentList.scss';

const CommentList = (props) => {
	const {movieId} = props;
	useFirestoreConnect(['comments', 'movies']);
	const movieSelector = useSelector((state) => state.firestore.data.movies)
	const commentSelector = useSelector((state) => state.firestore.data.comments)

	// Ensure the selector has loaded
	if(!isLoaded(movieSelector) || !isLoaded(commentSelector)) return <div className='loading'>Loading...</div>

	// Configure data
	const movie = movieSelector ? movieSelector[parseInt(movieId, 10)] : null;
	const comments = movie && movie.comments ? movie.comments.map((element) => {
		return commentSelector[element]
	}) : null;
	const commentsComponent = comments && comments !== [] ? comments.map((comment, index) => {
		return (<CommentDetails key={index} comment={comment} />)
	}) : (
		<p className='emptyText'>No comments yet</p>
	)

	return (
		<div className='commentList'>
			<h1 className='commentHeader'>Comments</h1>
			{commentsComponent}
		</div>
	)
}

export default CommentList