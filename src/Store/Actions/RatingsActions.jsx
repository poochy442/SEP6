export const getRatings = () => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		// make async call to database
		const firestore = getFirestore();
		const firebase = getFirebase();

		firebase.collection('reviews').get()
		.then((res) => {
			firestore.collection('reviews').doc(res.reviews).get()
			/*const highestRate = Math.max(...ratingDoc)
			const lowestRate = Math.min(...ratingDoc)*/

			dispatch({ type: 'GET_RATING_SUCCESS' });
		}).catch((err) => {
			dispatch({ type: 'GET_RATING_ERROR' }, err);
		})
	}
}