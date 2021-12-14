export const getRatings = () => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		// make async call to database
		const firestore = getFirestore();
		const firebase = getFirebase();

		firestore.collection('reviews').get()
		
		.then(async (res) => {
			 
			let min ={}  
			let max ={}
			const ratingsData ={}
			res.forEach(doc => {
				
				firestore.collection("movies").get()
				const review = doc.data()
				if (min.score !== undefined) {
					min = min.score>review.score ? review : min
				}
				else {
					min = review;
				}
				if (max.score !== undefined) {
					max = max.score<review.score ? review : max
				}
				else {
					max = review;
				}
				//ratingsData[doc.id] = doc.data()
			  });
			  firestore.collection('movies').get()
			  .then(async (res) => {
				res.forEach(doc => {
					const movie = doc.data()
					
				  if (movie.reviews.includes(min.id)) 
				  {
					min.movietitle = movie.title;
				}
				if (movie.reviews.includes(max.id)) {
					
					max.movietitle = movie.title;
				}
				})  
				ratingsData.min = min;
				ratingsData.max = max;
			/*const highestRate = res.filter(Math.max(...ratingsData.)
			const lowestRate = Math.min(...ratingDoc)*/

			dispatch({ type: 'GET_RATING_SUCCESS', 'payload': ratingsData});
			  });
			  console.log(min);
			
		}).catch((err) => {
			dispatch({ type: 'GET_RATING_ERROR' }, err);
		})
	}
}