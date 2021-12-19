import React, { memo, useEffect, useState } from 'react';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import { addUserCourse, removeUserCourse } from '../../../redux/user-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCourses } from '../../../redux/user-selectors';
import './CoursesItem.sass';
import { getIsAuth, getUserRole } from '../../../redux/auth-selectors';
import { CourseType } from '../../../types';
import CourseForm from '../CourseForm/CourseForm';
import { courseAPI } from '../../../service/api/course-api';

const CoursesItem = memo(() => {
	const [course, setCourse] = useState<CourseType>({
		course_id: 0,
		course_name: '',
		course_price: 0,
		course_description: '',
		create_time: '',
		rating: 0,
		creator_id: 0,
		image: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const isAuth = useSelector(getIsAuth);
	const isAdmin = useSelector(getUserRole) === 'admin';

	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	const userCourses = useSelector(getUserCourses);
	const isCurrentCourse = userCourses.find((c) => c.course_id === course.course_id);

	useEffect(() => {
		fetchCourse();
	}, [location]);

	const fetchCourse = async () => {
		setIsLoading(true);
		const res = await courseAPI.getCourseById(Number(history.location.pathname.split('/')[2]));
		setCourse(res.data.course);
		setIsLoading(false);
	};

	const handleAddCourse = () => {
		dispatch(addUserCourse(course.course_id));
		history.push('/courses');
	};

	const handleDeleteCourse = () => {
		dispatch(removeUserCourse(course.course_id));
		history.push('/courses');
	};

	if (!isAuth) return <Redirect to='/authentication/login' />;

	return (
		<div className='container'>
			{isLoading ? (
				<div>Loading</div>
			) : isAdmin ? (
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
