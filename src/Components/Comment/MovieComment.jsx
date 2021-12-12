import React, { useState } from 'react'
import { connect } from 'react-redux';
import { createComment } from '../../Store/Actions/commentActions';

import '../../Styles/Comment/MovieComment.scss';

const MovieComment = (props) => {
	const [comment, setComment] = useState('')
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)
	const { movie } = props;

	const handleChange = (e) => {
		setComment(e.target.value)
		setSuccess(null)
	}

	const handleConfirm = () => {
		if(comment !== ''){
			props.createComment({comment: comment, movie: movie})
			setSuccess('Comment sent')
			setError(null)
		} else {
			setError('Comment can\'t be empty');
		}
		setComment('')
	}

	return (
		<div className='movieComment'>
			<label className='inputLabel'>Comment on the movie</label>
			<textarea
				name='comment' placeholder='Type your comment...'
				className='commentInput' value={comment} onChange={handleChange} />
			{error ? (
				<p className='errorText'>{error}</p>
			) : null}
			<button className='button commentButton' onClick={handleConfirm}>Comment</button>
			{success ? (
				<p className='succesText'>{success}</p>
			) : null}
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		createComment: (comment) => dispatch(createComment(comment))
	}
}

export default connect(null, mapDispatchToProps)(MovieComment)