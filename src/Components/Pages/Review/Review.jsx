import React from 'react'
import { Form } from 'react-bootstrap'

function Review() {
	return (
		<Form>
			<Form.Group className='mb-3' controlId="review">
				<Form.Label>Review</Form.Label>
				<Form.Control
					as='textarea'
					placeholder='Write your review'
				/>
			</Form.Group>

		</Form>
	)
}

export default Review