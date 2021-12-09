import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import '../../Styles/Review/ReviewDetails.scss'

const ReviewDetails = (props) => {
	const {review} = props;
	useFirestoreConnect([{
		collection: 'users',
		doc: review.reviewerId,
		storeAs: 'reviewer'
	}])
	const reviewer = useSelector((state) => state.firestore.data.reviewer);

	const scoreDisplay = (
		<div className='scoreDisplay'>
			{new Array(parseInt(review.score, 10)).fill(null).map((element, index) => {
				return <span className='scoreStar' key={index}>&#9733;</span>
			})}
		</div>
	)

	return (
		<div className='reviewDetails'>
			<h1 className='reviewTitle'>{review.title}</h1>
			<p className='reviewContent'>{review.review}</p>
			{scoreDisplay}
			<div className='bottomContainer'>
				{reviewer ? <div className='reviewerContainer'>
					<div className='avatar'>{reviewer.initials}</div>
					<p className='userName'>{reviewer.username}</p>
				</div> : <div>Loading reviewer...</div>}
				<p className='reviewDate'>{new Date(review.createdAt.seconds * 1000).toLocaleString()}</p>
			</div>
		</div>
	)
}

export default ReviewDetails