import '../../Styles/Layout/Footer.scss';

const Footer = () => {
	return (
		<section className='footer'>
			<div className='leftFooter'>
				<p>BestMovies</p>
			</div>
			<div className='rightFooter'>
				<a href='https://github.com/poochy442/SEP6' className='link'><p>GitHub</p></a>
				<a href='/' className='link'><p>YouTube Playlist</p></a>
			</div>
		</section>
	)
}

export default Footer;