import React from 'react'
import { Link } from 'react-router-dom';
import '../../Styles/Movie/MovieDetails.scss'

const MovieDetails = (props) => {
	const { movie, redirect } = props;

	const scoreDisplay = (
		<div className='scoreDisplay'>
			{movie.score ? <div className='scoreContainer'>
				<p className='scoreHeader'>Score: </p>
				<div className="scoreDetails">
					<div className="starContainer">
						<span className='scoreStar'>&#9733;</span>
						<span className='scoreStar'>&#9733;</span>
						<span className='scoreStar'>&#9733;</span>
						<span className='scoreStar'>&#9733;</span>
						<span className='scoreStar'>&#9733;</span>
						<div className='scoreMask' style={{
							display: 'inline-block',
							position: 'absolute',
							right: 0,
							width: (100 - (movie.score / 5) * 100) + '%',
							backgroundColor: 'white',
							opacity: 0.75
						}}>&nbsp;</div>
					</div>
					<p className='scoreText'>{movie.score}</p>
				</div>
			</div> : <div>No score yet</div>}
			{movie.reviews ? <div className="reviewContainer">
				<p className="reviewHeader">Reviews: </p>
				<p className='reviewAmount'>{movie.reviews.length}</p>
			</div> : null}
		</div>
	)

	const movieDetailsComponent = redirect ? (
		<Link to={redirect} state={movie} className='movieDetails movieLink'>
			<img className='movieImage' src={'https://image.tmdb.org/t/p/w500' + movie.imgURL} alt='Movie poster' />
			<div className='movieInformation'>
				<h1 className='movieTitle'>{movie.title}</h1>
				<p className='releaseDate'>{movie.releaseDate}</p>
				<p className='plotDetails'>{movie.plot}</p>
				{scoreDisplay}
			</div>
		</Link>
	) : (
		<div className='movieDetails'>
			<img className='movieImage' src={'https://image.tmdb.org/t/p/w500' + movie.imgURL} alt='Movie poster' />
			<div className='movieInformation'>
				<h1 className='movieTitle'>{movie.title}</h1>
				<p className='releaseDate'>{movie.releaseDate}</p>
				<p className='plotDetails'>{movie.plot}</p>
				{scoreDisplay}
			</div>
		</div>
	)

	return (
		<div>
			{movieDetailsComponent}
		</div>
	)
}

export default MovieDetails