import React from 'react'
import '../../Styles/Movie/MovieDetails.scss'

const MovieDetails = (props) => {
	const { movie } = props;

	return (
		<div className='movieDetails'>
			<img className='movieImage' src={'https://image.tmdb.org/t/p/w500' + movie.imgURL} alt='Movie poster' />
			<div className='movieInformation'>
				<h1 className='movieTitle'>{movie.title}</h1>
				<p className='releaseDate'>{movie.releaseDate}</p>
				<p className='plotDetails'>{movie.plot}</p>
			</div>
		</div>
	)
}

export default MovieDetails