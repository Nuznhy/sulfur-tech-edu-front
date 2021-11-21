import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { getCourseById } from '../mockedData';
import { actions } from '../../../redux/user-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCourses } from '../../../redux/user-selectors';

const CoursesItem = memo(() => {
	const history = useHistory();
	const dispatch = useDispatch();
	const course = getCourseById(Number(history.location.pathname.split('/')[2]))[0];
	const userCourses = useSelector(getUserCourses);

	const handleAddCourse = () => {
		dispatch(actions.addUserCourses(course));
		alert('You have successfully enrolled in this course');
	};

	const handleDeleteCourse = () => {
		dispatch(actions.removeUserCourses(course.id));
		alert('You have successfully removed this course');
	};

	console.log(userCourses);

	return (
		<div>
			{course.title}
			{userCourses.find((c) => c.id === course.id) ? (
				<button onClick={handleDeleteCourse}>Remove course</button>
			) : (
				<button onClick={handleAddCourse}>Add course</button>
			)}
		</div>
	);
});

export default CoursesItem;
