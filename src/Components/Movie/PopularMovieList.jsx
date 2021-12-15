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
		if(sortedArray === []){
			sortedArray.push(movie);
		} else {
			let isGreater = false;
			let count = 0;

			while(isGreater === false && count < sortedArray.length){
				isGreater = movie.score >= sortedArray[count].score;
				count += isGreater ? 1 : 0;
			}

			sortedArray.splice(count, 0, movie)
		}
	};

	return sortedArray.reverse();
}

export default PopularMovieList
