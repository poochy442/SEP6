import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import '../../Styles/Review/ReviewDetails.scss'

const ReviewDetails = (props) => {
	const {review} = props;
	useFirestoreConnect([{
		collection: 'users',
		doc: review.reviewerId
	}]);
	const user = useSelector((state) => state.firestore.data.users)
	const reviewer = user[review.reviewerId]

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
				<div className='reviewerContainer'>
					<div className='avatar'>{reviewer.initials}</div>
					<p className='userName'>{reviewer.username}</p>
				</div>
				<p className='reviewDate'>{new Date(review.createdAt.seconds * 1000).toLocaleString()}</p>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		profile: state.firestore
	}
}

export default connect(mapStateToProps)(ReviewDetails)