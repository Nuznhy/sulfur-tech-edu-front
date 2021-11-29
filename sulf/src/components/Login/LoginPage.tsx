import React, { memo } from 'react';
import Login from './Login';
import Registration from './Registration';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../../redux/auth-selectors';
import { Redirect, useLocation } from 'react-router';
import './LoginPage.sass';
import { NavLink } from 'react-router-dom';
import AuthenticationIcon from '../../images/formIcon.png';

const SignInOutContainer: React.FC = memo(() => {
	const isAuth = useSelector(getIsAuth);
	const searchQuery = useLocation().pathname.split('/')[2];

	if (isAuth) return <Redirect to='/profile' />;

	return (
		<div className='page-container'>
			<div className='authentication-icon'>
				<img alt='' src={AuthenticationIcon} />
			</div>
			<div className='authentication-links'>
				<NavLink to='/authentication/login'>Sign In</NavLink>
				<NavLink to='/authentication/registration'>Sign Up</NavLink>
			</div>
			<div>{searchQuery === 'login' ? <Login /> : <Registration />}</div>
		</div>
	);
});

export default SignInOutContainer;
