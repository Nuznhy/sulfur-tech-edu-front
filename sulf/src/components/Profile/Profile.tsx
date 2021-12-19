import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { logout } from '../../redux/auth-reducer';
import { getUserName } from '../../redux/auth-selectors';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import ListItem from '../Courses/CoursesList/ListItem';
import ProfileIcon from '../../images/profileIcon.png';
import { Button } from '@material-ui/core';
import './Profile.sass';
import { getAllUserCourses } from '../../redux/user-reducer';
import { courseAPI } from '../../service/api/course-api';
import { CourseType } from '../../types';

const Profile: React.FC = memo(() => {
	const [isLoading, setIsLoading] = useState(false);
	const [userCourses, setUserCourses] = useState<Array<CourseType>>([]);
	const userName = useSelector(getUserName);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchCourser();
	}, []);

	const onLogout = () => {
		dispatch(logout());
	};

	const fetchCourser = async () => {
		setIsLoading(true);
		const res = await courseAPI.getUserCourses();
		setUserCourses([...res.data.courses]);
		dispatch(getAllUserCourses());
		setIsLoading(false);
	};

	return isLoading ? (
		<div>Loading</div>
	) : (
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
