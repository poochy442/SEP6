import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createReview } from '../../Store/Actions/ReviewActions'
import '../../Styles/Movie/MovieReview.scss'

function MovieReview(props) {
	const initialInput = {
		title: '',
		review: '',
		score: ''
	}
	const [input, setInput] = useState(initialInput)
	const [error, setError] = useState(null)
	const [success, setSuccess] = useState(null)
	const { movie } = props;

	const handleChange = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		})
	}
	const handleClick = (value) => {
		setInput({
			...input,
			score: value
		})
	}

	const confirmContent = () => {
		if(input.title === ''){
			setError('Review must have a title.')
			return false
		}
		if(input.review === ''){
			setError('Review cannot be empty.')
			return false
		}
		if(input.score === ''){
			setError('Each review must have a score.')
			return false
		}

		// Request is good
		setError(null)
		return true;
	}

	const placeReview = () => {
		if(confirmContent()){
			props.createReview({review: input, movie: movie});
			setSuccess('Review sent')
			setInput(initialInput)
		} else {
			console.log('Place review error')
		}
	}

	const scoreContainer = (
		<div className='scoreInput'>
			<div className='score' onClick={() => handleClick(1)} >
				<span className={input.score === 1 ? 'scoreCircle active' : 'scoreCircle'} />
				<p>1</p>
			</div>
			<div className='score' onClick={() => handleClick(2)} >
				<span className={input.score === 2 ? 'scoreCircle active' : 'scoreCircle'} />
				<p>2</p>
			</div>
			<div className='score' onClick={() => handleClick(3)} >
				<span className={input.score === 3 ? 'scoreCircle active' : 'scoreCircle'} />
				<p>3</p>
			</div>
			<div className='score' onClick={() => handleClick(4)} >
				<span className={input.score === 4 ? 'scoreCircle active' : 'scoreCircle'} />
				<p>4</p>
			</div>
			<div className='score' onClick={() => handleClick(5)} >
				<span className={input.score === 5 ? 'scoreCircle active' : 'scoreCircle'} />
				<p>5</p>
			</div>
		</div>
	)

	return (
		<div className='reviewContainer'>
			<div className='reviewInputContainer'>
				<label className='inputLabel'>Review title</label>
				<input
					type='text' name='title' placeholder='Insert title...'
					className='reviewInput' value={input.title} onChange={handleChange} />
			</div>
			<div className='reviewInputContainer'>
				<label className='inputLabel'>Review</label>
				<textarea
					name='review' placeholder='Type your review...'
					className='reviewInput' value={input.review} onChange={handleChange} />
			</div>
			{scoreContainer}
			{error ? (
				<p className='errorText'>{error}</p>
			) : null}
			<div className='buttonContainer'>
				<button className='button confirmButton' onClick={placeReview}>Review</button>
				<button className='button resetButton' onClick={() => setInput(initialInput)}>Reset</button>
			</div>
			{success ? (
				<p className='succesText'>{success}</p>
			) : null}
		</div>
	)
}

const mapDispatchToProps = (dispatch) => {
	return {
		createReview: (creds) => dispatch(createReview(creds))
	}
}

export default connect(null, mapDispatchToProps)(MovieReview)