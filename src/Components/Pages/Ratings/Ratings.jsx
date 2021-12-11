//import React, { useState } from 'react'
//import { useLocation } from 'react-router';

import '../../../Styles/Pages/Ratings/Ratings.scss';


const Ratings = () => {

	return (
		<div className='ratings'>
            <div className='topRated'>
                <p>Top Rated</p>
			<div className='movieInformation'>
				<p className='movieTitle'>Movie Title</p>
				<p className='releaseDate'>Release Date</p>
				<p className='plotDetails'>Plot Details</p>
			</div>
            </div>
            <div className='lowRated'>
                <p>Low Rated</p>
			<div className='movieInformation'>
                <p className='movieTitle'>Movie Title</p>
				<p className='releaseDate'>Release Date</p>
				<p className='plotDetails'>Plot Details</p>
			</div>
            </div>
		</div>
	)
}

export default Ratings