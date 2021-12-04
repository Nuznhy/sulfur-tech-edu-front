import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { logout } from '../../redux/auth-reducer';
import { getUserEmail } from '../../redux/auth-selectors';
import { getUserCourses } from '../../redux/user-selectors';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import ListItem from '../Courses/CoursesList/ListItem'
import './Profile.sass'
import { courses } from '../Courses/mockedData';

const Profile: React.FC = memo(() => {
	const userName = useSelector(getUserEmail);
	//const userCourses = useSelector(getUserCourses);
	const userCourses = courses;
	const dispatch = useDispatch();

	const onLogout = () => {
		dispatch(logout());
	};

	return (
		<div className='container'>
			Logged in as {userName}
			<button onClick={onLogout}>Log out</button>
			<div className='wrapper'>
				{userCourses && userCourses.map(course => (
					<div className='item'>
						<ListItem course={course} />
					</div>
				))}
			</div>
		</div>
	);
});

export default compose<React.ComponentType>(withAuthRedirect)(Profile);
