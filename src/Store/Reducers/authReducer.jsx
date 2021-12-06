const initState = {}

const authReducer = (state = initState, action) => {
	switch(action.type){
		case 'LOGIN_ERROR':
			return {
				...state, 
				authError: 'Login failed'
			}
		case 'LOGIN_SUCCESS':
			return {
				...state,
				authError: null,
			}
		case 'SIGNUP_ERROR':
			return {
				...state,
				authError: 'Signup failed'
			}
		case 'SIGNUP_SUCCESS':
			return {
				...state,
				authError: null,
			}
		case 'SIGNOUT_SUCCESS':
			return state;
		case 'AUTH_CLEAR':
			return {
				...state,
				authError: null,
			}
		default:
			return state;
	}
}

export default authReducer