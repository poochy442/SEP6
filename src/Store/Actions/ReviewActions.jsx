import { FunctionClient } from "../../Components/Api/FunctionClient";

export const createReview = ({review, movie}) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		// make async call to database
		const firestore = getFirestore();
		const firebase = getFirebase();

		firestore.collection('reviews').add({
			...review,
			score: review.score + '',
			reviewerId: firebase.auth().currentUser.uid,
			movieId: movie.id,
			createdAt: new Date()
		}).then(async (res) => {
			const reviewId = res.id;
			const movieRef = firestore.collection('movies').doc(movie.id + '');
			const movieDoc = await movieRef.get();

			if(movieDoc.exists){
				FunctionClient.review({
					params: {
						reviewID: reviewId,
						movieID: movieDoc.id
					},
					body: review
				}).then((res) => {
					console.log('function success', res)
				}).catch((err) => {
					console.log('function error', err)
				})
			} else {
				await movieRef.set({
					imgURL: movie.imgURL,
					plot: movie.plot,
					releaseDate: movie.releaseDate,
					title: movie.title
				})
				FunctionClient.review({
					params: {
						reviewID: reviewId,
						movieID: movieDoc.id
					},
					body: review
				}).then((res) => {
					console.log('function success', res)
				}).catch((err) => {
					console.log('function error', err)
				})
			}
			dispatch({ type: 'CREATE_REVIEW_SUCCESS' });
		}).catch((err) => {
			dispatch({ type: 'CREATE_REVIEW_ERROR' }, err);
		})
	}
}

export const updateReview = ({review, movie}) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firestore = getFirestore();

		const reviewRef = firestore.collection('reviews').doc(review.id + '')
		reviewRef.update(review)

		FunctionClient.updateReview({
					params: {
						reviewID: review.id,
						movieID: movie.id
					},
					body: review
				}).then((res) => {
					console.log('function success', res)
				}).catch((err) => {
					console.log('function error', err)
				})
	}
}