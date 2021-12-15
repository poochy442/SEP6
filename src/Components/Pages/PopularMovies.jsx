import React from 'react'
import { useSelector } from 'react-redux';
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase'
import PopularMovieList from '../Movie/PopularMovieList'

function PopularMovies() {
	useFirestoreConnect(['movies']);
	const movieSelector = useSelector((state) => state.firestore.data.movies)
	
	// Ensure the selector has loaded
	if(!isLoaded(movieSelector)) return <div className='loading'>Loading...</div>

	const movies = Object.values(movieSelector)

	return (
		<div className='popularMovies'>
			<h1>Top rated movies:</h1>
			<PopularMovieList movies={movies} />
		</div>
	)
}

export default PopularMovies
