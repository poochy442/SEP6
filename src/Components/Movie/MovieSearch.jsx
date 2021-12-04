import React, { useState } from 'react'
import { TMBDClient } from '../TMBDClient'

import '../../Styles/Movie/MovieSearch.scss'
import { Link } from 'react-router-dom';

// Custom Form Component that searches for movies and display them in a drop-down
const MovieSearch = ({movie, setMovie, isReviewing}) => {
	const [search, setSearch] = useState([]);
	const [isSearching, setSearching] = useState(false);
	const [query, setQuery] = useState('');

	const handleChange = (e) => {
		e.preventDefault();
		setQuery(e.target.value);

		// Search for movie if length is greater than 3
		if(e.target.value.length >= 3){
			TMBDClient.get('search/movie', {
				params: {
					query: e.target.value
				}
			}).then((res) => {
				if(res.status === 200){
					console.log(res);
					setSearch(res.data.results.map(element => {
						return {
							id: element.id,
							title: element.title,
							imgURL: element.poster_path,
							releaseDate: element.release_date,
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
			<input type='text' placeholder='Search for a movie...' className='movieSearchInput' value={query} onChange={handleChange} />
			{isSearching ? search.map((element, index) => {
				if(isReviewing)
					return (
						<div to='/review' state={element} className='movieDropdownItem' key={index} onClick={() => setMovie(element)} >
							<img className='movieImage' src={'https://image.tmdb.org/t/p/w500' + element.imgURL} alt='Movie poster' />
							<p className='movieTitle'>{element.title}</p>
						</div>
					)
				else
					return (
						<Link to='/review' state={element} className='movieDropdownItem' key={index} >
							<img className='movieImage' src={'https://image.tmdb.org/t/p/w500' + element.imgURL} alt='Movie poster' />
							<p className='movieTitle'>{element.title}</p>
						</Link>
					)
			}) : null}
		</div>
	)
}

export default MovieSearch
