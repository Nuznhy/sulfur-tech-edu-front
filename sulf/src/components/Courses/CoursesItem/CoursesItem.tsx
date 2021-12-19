import React, { memo } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { getCourseById } from '../mockedData';
import { addUserCourse, removeUserCourse } from '../../../redux/user-reducer';
import { useSelector } from 'react-redux';
import { getUserCourses } from '../../../redux/user-selectors';
import './CoursesItem.sass';
import { getIsAuth, getUserId, getUserRole } from '../../../redux/auth-selectors';
import { CourseType } from '../../../types';
import CourseForm from '../CourseForm/CourseForm';

const CoursesItem = memo(() => {
	const isAuth = useSelector(getIsAuth);
	const userId = useSelector(getUserId);
	const isAdmin = useSelector(getUserRole) === 'admin';

	const history = useHistory();
	const course = getCourseById(Number(history.location.pathname.split('/')[2]))[0];

	const userCourses = useSelector(getUserCourses);
	const isCurrentCourse = userCourses.find((c) => c.course_id === course.course_id);

	const handleAddCourse = () => {
		addUserCourse(userId, course.course_id);
		alert('You have successfully enrolled in this course');
	};

	const handleDeleteCourse = () => {
		removeUserCourse(userId, course.course_id);
		alert('You have successfully removed this course');
	};

	if (!isAuth) return <Redirect to='/authentication/login' />;

	return (
		<div className='container'>
			{isAdmin ? (
				<CourseForm course={course} />
			) : (
				<CourseInfo
					course={course}
					isCurrentCourse={isCurrentCourse}
					handleAddCourse={handleAddCourse}
					handleDeleteCourse={handleDeleteCourse}
				/>
			)}
		</div>
	);
});

type CourseInfoType = {
	course: CourseType;
	isCurrentCourse: CourseType | undefined;
	handleAddCourse: () => void;
	handleDeleteCourse: () => void;
};

const CourseInfo: React.FC<CourseInfoType> = ({ course, isCurrentCourse, handleAddCourse, handleDeleteCourse }) => {
	return (
		<div className='course'>
			<div className='photo-container'>
				<img alt='' src={course.image} />
			</div>
			<div className='text-container'>
				<p className='title'>
					<span className='bold-text'>Name:</span> {course.course_name}
				</p>
				<p className='description'>
					<span className='bold-text'>Description:</span> {course.course_description}
				</p>
				<p className='status'>
					<span className='bold-text'>Status:</span> {isCurrentCourse ? 'Enrolled' : 'Not enrolled'}
				</p>
				<div className='btn-container'>
					{isCurrentCourse ? (
						<button className='btn red-btn' onClick={handleDeleteCourse}>
							Remove course
						</button>
					) : (
						<button className='btn green-btn' onClick={handleAddCourse}>
							Add course
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default CoursesItem;
