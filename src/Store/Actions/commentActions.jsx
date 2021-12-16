export const createComment = ({comment, movie}) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firestore = getFirestore();
		const firebase = getFirebase();

		firestore.collection('comments').add({
			comment,
			authorId: firebase.auth().currentUser.uid,
			createdAt: new Date()
		}).then(async (res) => {
			const commentId = res.id;
			const movieRef = firestore.collection('movies').doc(movie.id + '');
			const movieDoc = await movieRef.get();

			if(movieDoc.exists){
				movieRef.update({
					comments: firebase.firestore.FieldValue.arrayUnion(commentId)
				});
			} else {
				movieRef.set({
					imgURL: movie.imgURL,
					plot: movie.plot,
					releaseDate: movie.releaseDate,
					title: movie.title,
					reviews: [],
					comments: firebase.firestore.FieldValue.arrayUnion(commentId)
				})
			}
			dispatch({ type: 'CREATE_COMMENT_SUCCESS' });
		}).catch((err) => {
			dispatch({ type: 'CREATE_COMMENT_ERROR' }, err);
		})
	}
}