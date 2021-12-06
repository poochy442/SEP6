import React from 'react'
import MovieDetails from './MovieDetails.jsx'

const MovieList = (movies) => {
	return (
		<div className='movieList'>
			{movies.map((movie) => <MovieDetails />)}
		</div>
	)
}

export default MovieList