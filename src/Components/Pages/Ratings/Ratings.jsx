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

	return (
		<div className='ratings'>
            <div className='topRated'>
                <p>Best Review Movie: {props.ratingsData? props.ratingsData['max'].movietitle : 'not available'}  </p>
			<div className='movieInformation'>
			<p className='ratingTitle'> Review title : {props.ratingsData? props.ratingsData['max'].title : 'not available'} </p>
				<p className='ratingScore'>Review score : {props.ratingsData? props.ratingsData['max'].score : 'not available'} </p>
				<p className='ratingDetails'>Review : {props.ratingsData? props.ratingsData['max'].review : 'not available'}</p>
			</div>
            </div>
            <div className='lowRated'>
                <p>Worst Review Movie: {props.ratingsData? props.ratingsData['min'].movietitle : 'not available'}</p>
			<div className='movieInformation'>
			<p className='ratingTitle'> Review title : {props.ratingsData? props.ratingsData['min'].title : 'not available'} </p>
				<p className='ratingScore'>Review score : {props.ratingsData? props.ratingsData['min'].score : 'not available'} </p>
				<p className='ratingDetails'>Review : {props.ratingsData? props.ratingsData['min'].review : 'not available'}</p>
                
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
	
	return {
	  ratingsData: state.ratingsReducer.ratingsData
	}
  }
export default connect(mapStateToProps, mapDispatchToProps)(Ratings)

