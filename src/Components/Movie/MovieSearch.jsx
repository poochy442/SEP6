import React, { useState } from 'react'
import { TMBDClient } from '../TMBDClient'

import '../../Styles/Movie/MovieSearch.scss'

// Custom Form Component that searches for movies and display them in a drop-down
const MovieSearch = () => {
	const [movie, setMovie] = useState('');
	const [search, setSearch] = useState([]);
	const [isSearching, setSearching] = useState(false);

	const handleChange = (e) => {
		e.preventDefault();
		setMovie(e.target.value);
		console.log(movie)

		// Search for movie if length is greater than 3
		if(e.target.value.length >= 3){
			TMBDClient.get('search/movie', {
				params: {
					query: e.target.value
				}
			}).then((res) => {
				if(res.status === 200){
					setSearch(res.data.results.map(element => {
						return {
							title: element.title,
							imgURL: element.poster_path
						}
					}));
					setSearching(true);
				}
			}).catch((err) => {
				console.log('Movie search error:', err);
			})
		} else {
			setSearching(false);
			setSearch([]);
		}
	}

	return (
		<div className='movieSearch'>
			<input type='text' placeholder='Search for a movie...' className='movieSearchInput' onChange={handleChange} />
			{isSearching ? search.map((element, index) => {
				return(
					<div className='movieDropdownItem' key={index} >
						<img className='movieImage' src={'https://image.tmdb.org/t/p/w500' + element.imgURL} alt='Movie poster' />
						<p className='movieTitle'>{element.title}</p>
					</div>
				)
			}) : null}
		</div>
	)
}

export default MovieSearch
