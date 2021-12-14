import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router';
import { connect } from 'react-redux'

//import '../../Styles/Movie/MovieDetails.scss'
//import '../../../Styles/Pages/Ratings/Ratings.scss';
import { getRatings } from '../../../Store/Actions/RatingsActions';




const Ratings = (props) => {
	
	const [getRatingsData, setRatingsData] = useState();

	useEffect(() => {
		// Update the document title using the browser API
		
		props.getRatings()
		
	  }, []);

	return (
		<div>
            <div className='movieDetails'>
                <p className='movieTitle'>Best Review Movie: {props.ratingsData? props.ratingsData['max'].movietitle : 'not available'}  </p>
				<div className='movieInformation'>
				<p className='movieTitle'> Review title : {props.ratingsData? props.ratingsData['max'].title : 'not available'} </p>
				<p className='releaseDate'>Review score : {props.ratingsData? props.ratingsData['max'].score : 'not available'} </p>
				<p className='plotDetails'>Review : {props.ratingsData? props.ratingsData['max'].review : 'not available'}</p>
			</div>
            </div>
			<p>space</p>
            <div className='movieDetails'>
                <p>Worst Review Movie: {props.ratingsData? props.ratingsData['min'].movietitle : 'not available'}</p>
			<div className='movieInformation'>
			<p className='movieTitle'> Review title : {props.ratingsData? props.ratingsData['min'].title : 'not available'} </p>
				<p className='releaseDate'>Review score : {props.ratingsData? props.ratingsData['min'].score : 'not available'} </p>
				<p className='plotDetails'>Review : {props.ratingsData? props.ratingsData['min'].review : 'not available'}</p>
                
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

