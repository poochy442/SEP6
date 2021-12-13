const initState = {}

const ratingsReducer = (state = initState, action) => {
	switch(action.type){
		case 'GET_RATING_SUCCESS':
			console.log('Rating success');
			return {...state, ratingsData: action.payload};
		case 'GET_RATING_ERROR':
			console.log('Rating error', action);
			return state;
		default:
			return state;
	}
}

export default ratingsReducer