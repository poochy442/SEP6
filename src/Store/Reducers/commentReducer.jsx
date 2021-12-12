const initState = {}

const commentReducer = (state = initState, action) => {
	switch(action.type){
		case 'CREATE_COMMENT_SUCCESS':
			console.log('Comment success');
			return state;
		case 'CREATE_COMMENT_ERROR':
			console.log('Comment error', action);
			return state;
		default:
			return state;
	}
}

export default commentReducer