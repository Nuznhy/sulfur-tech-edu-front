import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { getIsAuth } from '../../redux/auth-selectors';
import './NavBar.sass';

const NavBar: React.FC = memo(() => {
	const isAuth = useSelector(getIsAuth);

	return (
		<>
			{isAuth ? (
				<div className='navbar'>
					<NavLink to='/profile' className='link'>
						Profile
					</NavLink>
					<NavLink to='/courses' className='link'>
						Courses
					</NavLink>
					<NavLink to='/settings' className='link'>
						Settings
					</NavLink>
				</div>
			) : (
				<div className='login-navbar'>
          <NavLink to='/authentication/login' className='login-link'>
						Log In
					</NavLink>
          <NavLink to='/authentication/registration' className='login-link'>
						Sign Up
					</NavLink>
        </div>
			)}
		</>
	);
});

export default NavBar;
