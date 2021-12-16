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

	const body = req.body;

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

		const oldReviews = movie.reviews ? movie.reviews.arrayValue : {values: []};
		const oldReviewLength = oldReviews.values.length;
		const oldScore = movie.score ? movieDoc.get('score') : 0;

		const totalPrior = oldReviewLength * oldScore;

		const newScore = (totalPrior + parseInt(review.score)) / (oldReviewLength + 1);

		console.info('--- Received request ---');
		console.info('Movie ID:', movieID);
		console.info('Old score: ', oldScore);
		console.info('New score', newScore);

		movieRef.update({
			reviews: FieldValue.arrayUnion(reviewID),
			score: newScore
		}).then(() => {
			res.status(200).end();
			return
		}).catch((err) => {
			console.error(err);
			res.status(400).send(err);
			return
		})
	}
};
