import '../../Styles/Layout/Header.scss';
import LoginHeader from '../Auth/LoginHeader';

const Header = () => {
	return (
		<section className='header'>
			<div className='logo'>
				BestMovies
			</div>
			<div className='nav'>
				<a href='/' className='link'><p>Home</p></a>
				<a href='/top-movies' className='link'><p>Top Movies</p></a>
				<LoginHeader />
			</div>
		</section>
	)
}

export default Header;