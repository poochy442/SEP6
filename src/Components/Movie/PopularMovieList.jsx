import React from 'react'
import MovieDetails from './MovieDetails';

import '../../Styles/Movie/PopularMovieList.scss';

const PopularMovieList = ({movies}) => {
	console.log('Popular movies', movies)
	const sortedMovies = sortMovieArray(movies);

	return (
		<div className='popularMovieList'>
			{sortedMovies.map((movie, index) => <MovieDetails redirect='/movie' key={index} movie={movie} />)}
		</div>
	)
}

const sortMovieArray = (movies) => {
	let sortedArray = []

	for(const movie of movies) {
		if(sortedArray.length === 0){
			sortedArray.push(movie);
		} else if(!movie.score) {
			// No score, do nothing
		} else {
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
	};

	return sortedArray.reverse();
}

export default PopularMovieList
