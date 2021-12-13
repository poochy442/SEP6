import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router';
import { connect } from 'react-redux'

import '../../../Styles/Pages/Ratings/Ratings.scss';
import { getRatings } from '../../../Store/Actions/RatingsActions';




const Ratings = (props) => {
	
	const [getRatingsData, setRatingsData] = useState();

	useEffect(() => {
		// Update the document title using the browser API
		
		props.getRatings()
		
	  }, []);
	  console.log(props.ratingsData);
	return (
		<div className='ratings'>
            <div className='topRated'>
                <p>Top Rated</p>
			<div className='movieInformation'>
				<p className='movieTitle'> Movie score = {props.ratingsData? props.ratingsData['7z1YM11bEvowlDd4ZNqX'].score : 'notavailabke'} </p>
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


const mapDispatchToProps = (dispatch) => {
	return {
		getRatings: () => dispatch(getRatings())
	}
}
const mapStateToProps = (state) => {
	console.log(state);
	return {
	  ratingsData: state.ratingsReducer.ratingsData
	}
  }
export default connect(mapStateToProps, mapDispatchToProps)(Ratings)

