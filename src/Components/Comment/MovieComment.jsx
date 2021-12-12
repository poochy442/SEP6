import React, { useState } from 'react'

const MovieComment = () => {
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)

	return (
		<div className='movieComment'>
			<div className="commentInputContainer">

			</div>
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

export default MovieComment
