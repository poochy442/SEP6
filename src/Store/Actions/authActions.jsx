export const logIn = (credentials) => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();

		firebase.auth().signInWithEmailAndPassword(
			credentials.email,
			credentials.password
		).then(() => {
			dispatch({ type: 'LOGIN_SUCCESS' })
		}).catch(() => {
			console.log('signup error: ');
			dispatch({ type: 'LOGIN_ERROR'})
		})
	}
}

export const logOut = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();

		firebase.auth().signOut().then(() => {
			dispatch({ type: 'SIGNOUT_SUCCESS' })
		})
	}
}

export const signUp = (credentials) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firebase = getFirebase();
		const firestore = getFirestore();

		firebase.auth().createUserWithEmailAndPassword(
			credentials.email,
			credentials.password
		).then((res) => {
			return firestore.collection('users').doc(res.user.uid).set({
				username: credentials.username,
				initials: credentials.username.substring(0,2)
			})
		}).then(() => {
			dispatch({ type: 'SIGNUP_SUCCESS' })
		}).catch(() => {
			dispatch({ type: 'SIGNUP_ERROR'})
		})
	}
}