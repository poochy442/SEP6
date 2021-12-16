const {Firestore, FieldValue} = require('@google-cloud/firestore');

/**
 * Responds to a HTTP request to update the score of a movie given the review
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
 exports.review = async (req, res) => {
	const firestore = new Firestore();

	const method = req.method;
	console.log('Request received -- method', method)

	const body = req.body;
	console.log('Received request body', body);

	res.set('Access-Control-Allow-Origin', '*');

	if (req.method === 'OPTIONS') {
    // Handle pre-flight check
    res.set('Access-Control-Allow-Methods', ['POST', 'PUT']);
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
		console.info('Completed pre-flight check');
    res.status(204).send('');
  } else {
		const review = body;
		const reviewID = req.query.reviewID;
		const movieID = req.query.movieID;

		const movieRef = firestore.doc('movies/' + movieID);
		const movieDoc = await movieRef.get();

		const movie = movieDoc._fieldsProto;

		console.log('Firebase received', movie);

		const oldReviews = movie.reviews ? movie.reviews.arrayValue : {values: []};
		const oldReviewLength = oldReviews.values.length;
		const oldScore = movie.score ? movieDoc.get('score') : 0;

		console.log('Received values', oldReviews, oldScore);

		const totalPrior = oldReviewLength * oldScore;
		console.log('totalPrior calculation', oldReviewLength, oldScore)

		const newScore = (totalPrior + parseInt(review.score)) / (oldReviewLength + 1);
		console.log('Newscore calculation:', totalPrior, review.score, oldReviewLength + 1)


		console.log('--- Logs ---');
		console.log('IDS:', reviewID, movieID);
		console.log('Score calculation', oldScore, oldReviewLength, review, movieID);
		console.log('New score', newScore);
		console.log('--- End of section ---')

		movieRef.update({
			reviews: FieldValue.arrayUnion(reviewID),
			score: newScore
		}).then(() => {
			console.log('Success');
			res.status(200).end();
			return
		}).catch((err) => {
			console.error(err);
			res.status(400).send(err);
			return
		})
	}
};
