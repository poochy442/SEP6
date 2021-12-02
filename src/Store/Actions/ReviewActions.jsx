export const createReview = (review) => {
	return (dispatch, getState, {getFirestore}) => {
		// make async call to database
		const firestore = getFirestore();
		firestore.collection('reviews').add({
			...review,
			reviewerId: 12345, // TODO: Change to user ID
			createdAt: new Date()
		}).then(() => {
			dispatch({ type: 'CREATE_REVIEW_SUCCESS' });
		}).catch(() => {
			dispatch({ type: 'CREATE_REVIEW_ERROR' }, err);
		})
	}
}