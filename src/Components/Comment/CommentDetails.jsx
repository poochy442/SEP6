import React from 'react'
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import '../../Styles/Comment/CommentDetails.scss';

const CommentDetails = (props) => {
	const {comment} = props;
	useFirestoreConnect([{
		collection: 'users',
		doc: comment.authorId,
		storeAs: 'author'
	}])
	const author = useSelector((state) => state.firestore.data.author);

	console.log(comment, author)

	return (
		<div className='commentDetails'>
			<p>{comment.comment}</p>
			<div className='bottomContainer'>
				{author ? <div className='authorContainer'>
					<div className='avatar'>{author.initials}</div>
					<p className='userName'>{author.username}</p>
				</div> : <div>Loading author...</div>}
				<p className='commentDate'>{new Date(comment.createdAt.seconds * 1000).toLocaleString()}</p>
			</div>
		</div>
	)
}

export default CommentDetails