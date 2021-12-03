import React from 'react'
import { Form } from 'react-bootstrap'
import MovieSearch from '../../Movie/MovieSearch'

function Review() {
	return (
		<Form>
			{/* <Form.Group className='mb-3' controlId="review">
				<Form.Label>Review</Form.Label>
				<Form.Control
					as='textarea'
					placeholder='Write your review'
				/>
			</Form.Group> */}
			<MovieSearch />
		</Form>
	)
}

export default Review