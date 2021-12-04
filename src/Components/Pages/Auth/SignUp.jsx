import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router';

import '../../../Styles/Pages/Auth/SignUp.scss'
import { connect } from 'react-redux';
import { signUp } from '../../../Store/Actions/authActions';

const SignUp = (props) => {
	const location = useLocation();
	const passedEmail = location.state;
	const [input, setInput] = useState({
		email: passedEmail ? passedEmail : '',
		username: '',
		password: '',
		repeatPassword: ''
	});
	const {authError, auth} = props;
	
	const handleValueChange = (e) => {
		setInput({
			...input,
			[e.target.id]: e.target.value
		})
	}

	// Authentication guard
	if (auth.uid) return <Navigate to='/' />;

	return (
		<div className='signUp'>
			<div className='signUpContainer'>
				<h1>Sign Up</h1>
				<div className='inputContainer'>
					<div className='signUpInput'>
						<label htmlFor='email'>Email</label>
						<input type='text' placeholder='Input email...' id='email' value={input.email} onChange={handleValueChange} />
					</div>
					<div className='signUpInput'>
						<label htmlFor='username'>Username</label>
						<input type='text' placeholder='Input username...' id='username' value={input.username} onChange={handleValueChange} />
					</div>
					<div className='signUpInput'>
						<label htmlFor='password'>Password</label>
						<input type='password' id='password' placeholder='Input password...' value={input.password} onChange={handleValueChange} />
					</div>
					<div className='signUpInput'>
						<label htmlFor='repeatPassword'>Repeat password</label>
						<input type='password' id='repeatPassword' placeholder='Input password...' value={input.repeatPassword} onChange={handleValueChange} />
					</div>
					{authError ? (
						<p className='errorText'>{authError}</p>
					) : (null)}
				</div>
				<div className='buttonContainer'>
					<button className='signUpButton button' onClick={() => props.signUp(input)}>Sign up</button>
					<div className='loginContainer'>
						<p>Already have an account?</p>
						<Link to='/login' state={input.email} className='loginButton button'>Log in</Link>
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
		signUp: (creds) => dispatch(signUp(creds))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)