import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { authUserThunk, logout } from '../../redux/auth-reducer';
import { getUserImage, getUserName } from '../../redux/auth-selectors';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import ListItem from '../Courses/CoursesList/ListItem';
import ProfileIcon from '../../images/profileIcon.png';
import { Button } from '@material-ui/core';
import './Profile.sass';
import { getAllUserCourses, uploadUserImage } from '../../redux/user-reducer';
import { courseAPI } from '../../service/api/course-api';
import { CourseType } from '../../types';
import Preloader from '../Preloader/Preloader';
import { convertToBase64 } from '../Courses/CourseForm/CourseForm';

const Profile: React.FC = memo(() => {
	const [isLoading, setIsLoading] = useState(false);
	const [userCourses, setUserCourses] = useState<Array<CourseType>>([]);
	const userName = useSelector(getUserName);
	const userImage = useSelector(getUserImage);
	const dispatch = useDispatch();
	const [base64String, setBase64String] = useState<string>();
	
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

	const photoUpload = async (e: any) => {
		e.preventDefault();
		const file = e.target.files[0];
		const base64Image = (await convertToBase64(file)) as string;
		setBase64String(base64Image);
	};

	const onUploadProfileImage = () => {
		dispatch(uploadUserImage(base64String as string));
	}

	return isLoading ? (
		<Preloader />
	) : (
		<div className='profile-container'>
			<div className='avatar-container'>
				<img alt='' src={userImage ? userImage : ProfileIcon} />
			</div>
			<div className='user-info'>
				<div>
					<input className='formik-field' accept='.jpef, .png, .jpg' type='file' onChange={photoUpload} />
				</div>
				<Button className='form-btn' variant='contained' onClick={onUploadProfileImage}>
					Upload image
				</Button>
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
