export const getRatings = () => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		// make async call to database
		const firestore = getFirestore();
		const firebase = getFirebase();

		firestore.collection('reviews').get()
		.then(async (res) => {
			 
			const ratingsData ={}
			res.forEach(doc => {
				
				ratingsData[doc.id] = doc.data()
			  });
			/*const highestRate = res.filter(Math.max(...ratingsData.)
			const lowestRate = Math.min(...ratingDoc)*/

			dispatch({ type: 'GET_RATING_SUCCESS', 'payload': ratingsData});
		}).catch((err) => {
			dispatch({ type: 'GET_RATING_ERROR' }, err);
		})
	}
}