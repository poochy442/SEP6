import MovieSearch from '../Movie/MovieSearch';
import '../../Styles/Pages/Home.scss';
import { useEffect, useState } from 'react';

const Home = () => {
	const [movie, setMovie] = useState('');

	useEffect(() => {
		console.log(movie);
	}, [movie])

	return (
		<div className='home'>
			<h1>Movie Search</h1>
			<MovieSearch movie={movie} setMovie={setMovie} />
		</div>
	)
}

export default Home;