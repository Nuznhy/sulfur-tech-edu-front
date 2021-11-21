import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { logout } from '../../redux/auth-reducer';
import { getUserEmail } from '../../redux/auth-selectors';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

const Profile: React.FC = memo(() => {
	const userName = useSelector(getUserEmail);
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
	};

	return (
		<div>
			Logged in as {userName}
			<button onClick={onLogout}>Log out</button>
		</div>
	);
});

export default compose<React.ComponentType>(withAuthRedirect)(Profile);
