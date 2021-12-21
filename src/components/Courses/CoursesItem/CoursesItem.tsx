import React, { memo, useEffect, useState } from 'react';
import { useHistory, Redirect, useLocation } from 'react-router-dom';
import { addUserCourse, removeUserCourse } from '../../../redux/user-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCourses } from '../../../redux/user-selectors';
import './CoursesItem.sass';
import { getIsAuth, getUserId, getUserName } from '../../../redux/auth-selectors';
import { CourseType } from '../../../types';
import CourseForm, { convertToBase64 } from '../CourseForm/CourseForm';
import { courseAPI } from '../../../service/api/course-api';
import Preloader from '../../Preloader/Preloader';
import { Button } from '@material-ui/core';
import { addTaskSolution } from '../../../redux/admin-reducer';
import { saveAs } from 'file-saver';

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
		completed: false,
		rate: 0,
		drive_link: ''
	});
	const [isLoading, setIsLoading] = useState(false);
	const isAuth = useSelector(getIsAuth);

	const isAdmin = useSelector(getUserId) === course.creator_id;

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
				<Preloader />
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
	const [taskSolutionFile, setTaskSolutionFile] = useState<string>();
	const [fileName, setFileName] = useState<string>();
	const userName = useSelector(getUserName);
	const userId = useSelector(getUserId);
	const dispatch = useDispatch();
	const history = useHistory();

	const fileUpload = async (e: any) => {
		e.preventDefault();
		const file = e.target.files[0];
		const base64Image = (await convertToBase64(file)) as string;
		setFileName(file.name);
		setTaskSolutionFile(base64Image.split(',')[1]);
	};

	const onAddTaskSolution = (taskId: number) => {
		dispatch(addTaskSolution(taskId, taskSolutionFile as string, fileName as string, userName as string));
		history.push('/courses');
	};

	const onDownloadTask = async (task_id: number) => {
		const res = await courseAPI.getTaskFile(task_id, userId as number);
		saveAs(`https://sulfur-tech-edu.herokuapp.com/course/task/download-task-file/${task_id}?user_id=${userId}`);
		alert('You have downloaded file');
	};

	const onDownloadTaskSolution = async (task_id: number, uploadedByUserId: number) => {
		const res = await courseAPI.getTaskSolutionTask(task_id, uploadedByUserId);
		saveAs(`https://sulfur-tech-edu.herokuapp.com/course/task/download-solution-file/${task_id}?user_id=${uploadedByUserId}`);
		alert('You have downloaded file');
	};

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
				<p className='status'>
					<span className='bold-text'>Completed:</span> {course.completed ? 'Yes' : 'No'}
				</p>
				<p className='status'>
					<a className='bold-text' href={course.drive_link}>Course Materials</a>
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
				<div>
					{
						course && course.tasks && course.tasks.map((t, index) => {
							return (
								<div className='task-container'>
									<p className='task-title'>Download task:</p>
									<p className='task_title_text' onClick={() => onDownloadTask(t.task_id)}>{t.name}</p>
									<p className='solution-title'>Solutions:</p>
										{t && t.solution && t.solution.map((s) => {
											return (
												<div>
													<p className='task_title_text' onClick={() => onDownloadTaskSolution(t.task_id, s.user_id)}>Download current solution</p>
												</div>
											);
										})}

									<input className='formik-field outlined' type='file' onChange={(e) => fileUpload(e)} />

									<div className='btn-container'>
										<Button
											onClick={() => onAddTaskSolution(t.task_id)}
											className='form-btn'
											type='submit'
											variant='contained'
										>
											{'Create Solution'}
										</Button>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	);
};

export default CoursesItem;
