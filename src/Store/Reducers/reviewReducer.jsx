const initState = {}

const reviewReducer = (state = initState, action) => {
	switch(action.type){
		case 'CREATE_PROJECT_SUCCESS':
			console.log('Review success');
			return state;
		case 'CREATE_REVIEW_ERROR':
			console.log('Review error', action);
			return state;
		default:
			return state;
	}
}

export default reviewReducer