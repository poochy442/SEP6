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
				movieRef.update({
					reviews: firebase.firestore.FieldValue.arrayUnion(reviewId)
				});
			} else {
				movieRef.set({
					imgURL: movie.imgURL,
					plot: movie.plot,
					releaseDate: movie.releaseDate,
					title: movie.title,
					reviews: firebase.firestore.FieldValue.arrayUnion(reviewId),
					comments: []
				})
			}
			dispatch({ type: 'CREATE_REVIEW_SUCCESS' });
		}).catch((err) => {
			dispatch({ type: 'CREATE_REVIEW_ERROR' }, err);
		})
	}
}

export const updateReview = ({review}) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firestore = getFirestore();

		const reviewRef = firestore.collection('reviews').doc(review.id + '')
		reviewRef.update(review)
	}
}