const initState = {}

const authReducer = (state = initState, action) => {
	switch(action.type){
		case 'LOGIN_ERROR':
			console.log('Login error:', action.err)
			return {
				...state, 
				// authError: action.err
			}
		case 'LOGIN_SUCCESS':
			return {
				...state,
			}
		case 'SIGNUP_ERROR':
			console.log('Signup error:', action.err)
			return {
				...state,
				// authError: action.err
			}
		case 'SIGNUP_SUCCESS':
			return {
				...state,
				authError: null,
			}
		case 'SIGNOUT_SUCCESS':
			return state
		default:
			return state;
	}
}

export default authReducer