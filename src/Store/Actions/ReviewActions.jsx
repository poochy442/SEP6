

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
		}).then((res) => {
			const reviewId = res.id;
			const movieRef = firestore.collection('movies').doc(movie.id + '');
			if(movieRef.exists){
				movieRef.update({
					reviews: firebase.firestore.FieldValue.arrayUnion(reviewId)
				});
			} else {
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