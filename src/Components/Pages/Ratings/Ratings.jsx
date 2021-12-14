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
                <p>Best Review</p>
			<div className='movieInformation'>
				<p className='movieTitle'> Review title = {props.ratingsData? props.ratingsData['7z1YM11bEvowlDd4ZNqX'].title : 'not available'} </p>
				<p className='releaseDate'>Review score = {props.ratingsData? props.ratingsData['7z1YM11bEvowlDd4ZNqX'].score : 'not available'} </p>
				<p className='plotDetails'>Review = {props.ratingsData? props.ratingsData['7z1YM11bEvowlDd4ZNqX'].review : 'not available'}</p>
			</div>
            </div>
            <div className='lowRated'>
                <p>Worst Review</p>
			<div className='movieInformation'>
                <p className='movieTitle'> Review title = {props.ratingsData? props.ratingsData['DaSbS334uhaBtcLZBQsR'].title : 'not available'} </p>
				<p className='releaseDate'>Review score = {props.ratingsData? props.ratingsData['DaSbS334uhaBtcLZBQsR'].score : 'not available'} </p>
				<p className='plotDetails'>Review = {props.ratingsData? props.ratingsData['DaSbS334uhaBtcLZBQsR'].review : 'not available'}</p>
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

