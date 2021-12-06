import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { logout } from '../../redux/auth-reducer';
import { getUserName } from '../../redux/auth-selectors';
import { getUserCourses } from '../../redux/user-selectors';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import ListItem from '../Courses/CoursesList/ListItem';
import ProfileIcon from '../../images/profileIcon.png';
import { Button } from '@material-ui/core';
import './Profile.sass';

const Profile: React.FC = memo(() => {
	const userName = useSelector(getUserName);
	const userCourses = useSelector(getUserCourses);
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
	};

	return (
		<div className='profile-container'>
			<div className='avatar-container'>
				<img alt='' src={ProfileIcon} />
			</div>
			<div className='user-info'>
				<p className='user-name'>{userName}</p>
				<p className='user-text'>My courses: </p>
				<div className='wrapper'>
					{userCourses.length > 0 ? (
						userCourses.map((course) => (
							<div className='item'>
								<ListItem course={course} />
							</div>
						))
					) : (
						<p className='empty-courses-text'>You don't have any courses</p>
					)}
				</div>
			</div>
			<div>
				<Button onClick={onLogout} className='logout-btn' type='submit'>
					Logout
				</Button>
			</div>
		</div>
	);
});

export default compose<React.ComponentType>(withAuthRedirect)(Profile);
