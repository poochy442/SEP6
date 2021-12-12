export const createComment = ({comment, movie}) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firestore = getFirestore();
		const firebase = getFirebase();
		console.log('Create comment start', comment, movie)

		firestore.collection('comments').add({
			comment,
			authorId: firebase.auth().currentUser.uid,
			createdAt: new Date()
		}).then(async (res) => {
			const commentId = res.id;
			const movieRef = firestore.collection('movies').doc(movie.id + '');
			console.log('Getting movie doc', movieRef)
			const movieDoc = await movieRef.get();

			console.log('Setting movie ref', movieDoc);
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
			console.log('Create comment error', err)
			dispatch({ type: 'CREATE_COMMENT_ERROR' }, err);
		})
	}
}