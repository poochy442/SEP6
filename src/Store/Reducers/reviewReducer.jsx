const initState = {}

const reviewReducer = (state = initState, action) => {
	switch(action.type){
		case 'CREATE_PROJECT_SUCCESS':
			console.log('success');
			return state;
		case 'CREATE_REVIEW_ERROR':
			console.log('Review error');
			return state;
		default:
			return state;
	}
}

export default reviewReducer