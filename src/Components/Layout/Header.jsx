import '../../Styles/Layout/Header.scss';
import LoginHeader from '../Login/LoginHeader';

const Header = () => {
	return (
		<section className='header'>
			<div className='logo'>
				LOGO
			</div>
			<div className='nav'>
				<a href='/' className='link'><p>Home</p></a>
				<a href='/review' className='link'><p>Review</p></a>
			</div>
			<LoginHeader />
		</section>
	)
}

export default Header;