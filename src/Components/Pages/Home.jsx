import MovieSearch from '../Movie/MovieSearch';
import '../../Styles/Pages/Home.scss';
import { useState } from 'react';

const Home = () => {
	const [movie, setMovie] = useState('');

	return (
		<div className='home'>
			<h1>Search for a movie to see it's reviews</h1>
			<MovieSearch movie={movie} setMovie={setMovie} redirect='/movie' />
		</div>
	)
}

export default Home;