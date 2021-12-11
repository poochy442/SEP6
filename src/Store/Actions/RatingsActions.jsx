export const getRatings = () => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		// make async call to database
		const firestore = getFirestore();
		const firebase = getFirebase();

		firestore.collection('reviews').get({
			...review,
			score: review.score 
		}).then(async (res) => {
			const movieRating = firestore.collection('reviews').doc(review.score);
			const ratingDoc = await movieRating.get();

			if(ratingDoc.exists){
				console.log('Updating movie rating')
				movieRating.update({
					reviews: firebase.firestore.FieldValue.arrayUnion(reviewScore)
				});
            }
			dispatch({ type: 'GET_RATING_SUCCESS' });
		}).catch((err) => {
			dispatch({ type: 'GET_RATING_ERROR' }, err);
		})
	}
}