import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router';
import { connect } from 'react-redux';
import { logIn } from '../../../Store/Actions/authActions';

import '../../../Styles/Pages/Auth/Login.scss'

const LogIn = (props) => {
	const location = useLocation();
	const passedEmail = location.state;
	const [input, setInput] = useState({
		email: passedEmail ? passedEmail : '',
		password: ''
	});
	const [error, setError] = useState(null);
	const {authError, auth} = props;

	const handleValueChange = (e) => {
		setInput({
			...input,
			[e.target.id]: e.target.value
		})
	}

	const handleLogin = () => {
		if(confirmContent())
			props.login(input);
	}

	const confirmContent = () => {
		if(input.email === ''){
			setError('Must provide an email.')
			return false
		}
		if(input.password === ''){
			setError('Password cannot be empty')
			return false
		}

		// Request is good
		setError(null)
		return true;
	}

	// Authentication guard
	if (auth.uid) return <Navigate to='/' />;

	return (
		<div className='login'>
			<div className='loginContainer'>
				<h1>Log in</h1>
				<div className='inputContainer'>
					<div className='loginInput'>
						<label htmlFor='email'>Email</label>
						<input type='text' placeholder='Input email...' id='email' value={input.email} onChange={handleValueChange} />
					</div>
					<div className='loginInput'>
						<label htmlFor='password'>Password</label>
						<input type='password' id='password' placeholder='Input password...' value={input.password} onChange={handleValueChange} />
					</div>
					{authError ? (
						<p className='errorText'>{authError}</p>
					) : error ? (
						<p className='errorText'>{error}</p>
					) : null}
				</div>
				<div className='buttonContainer'>
					<button className='loginButton button' onClick={handleLogin}>Log in</button>
					<div className='signUpContainer'>
						<p>Don't have an account?</p>
						<Link to='/signup' state={input.email} className='signUpButton button'>Sign up</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return{
		authError: state.auth.authError,
		auth: state.firebase.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		login: (creds) => dispatch(logIn(creds))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)