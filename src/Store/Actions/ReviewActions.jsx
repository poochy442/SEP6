export const createReview = ({review, movie}) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		// make async call to database
		const firestore = getFirestore();
		const firebase = getFirebase();

		firestore.collection('reviews').add({
			...review,
			score: review.score + '',
			reviewerId: firebase.auth().currentUser.uid,
			createdAt: new Date()
		}).then(async (res) => {
			const reviewId = res.id;
			const movieRef = firestore.collection('movies').doc(movie.id + '');
			const movieDoc = await movieRef.get();

			if(movieDoc.exists){
				console.log('Updating movie')
				movieRef.update({
					reviews: firebase.firestore.FieldValue.arrayUnion(reviewId)
				});
			} else {
				console.log('Setting movie')
				movieRef.set({
					imgURL: movie.imgURL,
					plot: movie.plot,
					releaseDate: movie.releaseDate,
					title: movie.title,
					reviews: firebase.firestore.FieldValue.arrayUnion(reviewId)
				})
			}
			dispatch({ type: 'CREATE_REVIEW_SUCCESS' });
		}).catch((err) => {
			dispatch({ type: 'CREATE_REVIEW_ERROR' }, err);
		})
	}
}