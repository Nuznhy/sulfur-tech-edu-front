import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { getCourseById } from '../mockedData';
import { actions } from '../../../redux/user-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCourses } from '../../../redux/user-selectors';
import './CoursesItem.sass';
import BackButton from '../BackButton/BackButton';

const CoursesItem = memo(() => {
	const history = useHistory();
	const dispatch = useDispatch();
	const course = getCourseById(Number(history.location.pathname.split('/')[2]))[0];

	const userCourses = useSelector(getUserCourses);
	const isCurrentCourse = userCourses.find((c) => c.id === course.id);

	const handleAddCourse = () => {
		dispatch(actions.addUserCourses(course));
		alert('You have successfully enrolled in this course');
	};

	const handleDeleteCourse = () => {
		dispatch(actions.removeUserCourses(course.id));
		alert('You have successfully removed this course');
	};

	return (
		<div className='course'>
			<div className='photo-container'>
				<img alt='' src={course.image} />
			</div>
			<BackButton />
			<div className='text-container'>
				<p className='title'>
					<span className='bold-text'>Name:</span> {course.title}
				</p>
				<p className='description'>
					<span className='bold-text'>Description:</span> {course.description}
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
});

export default CoursesItem;
