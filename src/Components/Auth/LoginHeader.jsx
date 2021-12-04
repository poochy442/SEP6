import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../Store/Actions/authActions';

import '../../Styles/Login/LoginHeader.scss';

const LoginHeader = (props) => {
	const { auth } = props;
	const links = auth.uid ? (
		<div className='authLinks'>
			<a className='link' onClick={props.logOut}><p>Log out</p></a>
		</div>
	) : (
		<div className='authLinks'>
			<a className='link' href='/login'><p>Log in</p></a>
			<a className='link' href='/signup'><p>Sign up</p></a>
		</div>
	);

	return (
		<div className='loginHeader'>
			{links}
			<div className='avatar'>
				<p>KJ</p>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logOut: () => dispatch(logOut())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginHeader)