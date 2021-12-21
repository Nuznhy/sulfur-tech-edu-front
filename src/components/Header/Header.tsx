import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getIsAuth } from '../../redux/auth-selectors';
import HeaderLogo from '../../images/headerLogo.png';
import ProfileLogo1 from '../../images/profileLogo1.svg';
import ProfileLogo2 from '../../images/profileLogo2.svg';
import NavBar from '../NavBar/NavBar';
import { useLocation } from 'react-router';
import classNames from 'classnames';
import './Header.sass';

const Header: React.FC = memo(() => {
	const isAuth = useSelector(getIsAuth);
	const searchQuery = useLocation().pathname.split('/')[1];

	let headerClasses = classNames({
		'green-bg': true,
		hidden: searchQuery === 'create-course' || searchQuery === 'courses' || searchQuery === 'profile',
	});

	return (
		<>
			{isAuth ? (
				<>
					<div className='header-container'>
						<div className='logo-container'>
							<div>
								<img alt='' src={HeaderLogo} />
							</div>
							<p className='title'>
								Sulf<span className='yellow-text'>Tech</span>Edu
							</p>
						</div>
						<div className='navbar-container'>
							<NavBar />
							<NavLink to='/profile'>
								<div className='logo-container'>
									<img alt='' src={ProfileLogo1} />
								</div>
							</NavLink>
						</div>
					</div>
					<div className={headerClasses}></div>
				</>
			) : (
				<>
					<div className='login-menu'>
						<NavBar />
						<NavLink to='/profile'>
							<div className='logo-container'>
								<img alt='' src={ProfileLogo2} />
							</div>
						</NavLink>
					</div>
				</>
			)}
		</>
	);
});

export default Header;
