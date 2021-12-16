import React from 'react'
import MovieDetails from './MovieDetails';

import '../../Styles/Movie/PopularMovieList.scss';

const PopularMovieList = ({movies}) => {
	console.log('Start popularMovieList', movies)
	const sortedMovies = sortMovieArray(movies);

	console.log('Sorted movies', sortedMovies)

	return (
		<div className='popularMovieList'>
			{sortedMovies.map((movie, index) => <MovieDetails key={index} movie={movie} />)}
		</div>
	)
}

const sortMovieArray = (movies) => {
	let sortedArray = []

	console.log('Sorting movies', movies)

	for(const movie of movies) {
		console.log('Sorting', movie)
		if(sortedArray.length === 0){
			console.log('First movie')
			sortedArray.push(movie);
		} else if(!movie.score) {
			// No score, do nothing
		} else {
			console.log('sortedArray', sortedArray)
			let count = 0;
			let isGreater = movie.score >= sortedArray[0].score;

			if(!isGreater){
				sortedArray.splice(0, 0, movie);
				continue;
			}

			while(isGreater === true && count < sortedArray.length){
				isGreater = movie.score >= sortedArray[count].score;
				count += isGreater ? 1 : 0;
			}

			sortedArray.splice(count, 0, movie)
		}
		console.log('After insert', sortedArray)
	};

	console.log('Final array', sortedArray)
	return sortedArray.reverse();
}

export default PopularMovieList
