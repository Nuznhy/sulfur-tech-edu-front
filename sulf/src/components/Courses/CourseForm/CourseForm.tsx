import React, { memo, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from '@material-ui/core';
import * as Yup from 'yup';
import { addCourse, addSolutionMark, addTask, addTaskSolution, removeCourse, updateCourse } from '../../../redux/admin-reducer';
import { CourseType } from '../../../types';
import { getCourseById } from '../mockedData';
import './CourseForm.sass';
import { Redirect, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuth, getUserId } from '../../../redux/auth-selectors';
import BackButton from '../BackButton/BackButton';
import { courseAPI } from '../../../service/api/course-api';
import { saveAs } from 'file-saver';
import NumberPicker from "react-widgets/NumberPicker";

type FormTypes = {
	title: string;
	description: string;
	price: string;
	drive_link: string;
};

type PropsType = {
	course?: CourseType;
};

export const convertToBase64 = async (file: File) => {
	return new Promise((resolve) => {
		let baseURL = '';

		let reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onload = () => {
			baseURL = reader.result as string;
			resolve(baseURL);
		};
	});
};

const CourseForm: React.FC<PropsType> = memo(({ course }) => {
	const mockedCourse = getCourseById(1)[0];
	const isAuth = useSelector(getIsAuth);
	const userId = useSelector(getUserId);
	const dispatch = useDispatch();
	const history = useHistory();
	const [base64String, setBase64String] = useState<string>();

	const [taskFile, setTaskFile] = useState<string>();
	const [maxGrade, setMaxGrade] = useState<number>();
	const [taskName, setTaskName] = useState('');
	const [fileName, setFileName] = useState('');

	const [mark, setMark] = useState<string>();

	const initialValues: FormTypes = {
		title: course ? course.course_name : '',
		description: course ? course.course_description : '',
		price: course ? course.course_price.toString() : '',
		drive_link: '',
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().max(50, 'Title too Long!').required('Required'),
		description: Yup.string().max(250, 'Description too Long!').required('Required'),
		price: Yup.string().required('Required'),
		drive_link: Yup.string().required('Required'),
	});

	const taskNameUpload = (e: any) => {
		setTaskName(e.target.value);
	};

	const taskMaxGradeUpload = (e: any) => {
		setMaxGrade(e.target.value);
	};

	const fileUpload = async (e: any) => {
		e.preventDefault();
		const file = e.target.files[0];
		const base64Image = (await convertToBase64(file)) as string;
		setFileName(file.name);
		setTaskFile(base64Image.split(',')[1]);
	};

	const photoUpload = async (e: any) => {
		e.preventDefault();
		const file = e.target.files[0];
		const base64Image = (await convertToBase64(file)) as string;
		setBase64String(base64Image);
	};

	const onDeleteCourse = () => {
		course && dispatch(removeCourse(course.course_id));
		history.push('/courses');
	};

	const onUpdateCourse = (id: number, title: string, description: string, price: number) => {
		dispatch(updateCourse(id, title, description, price));
		history.push('/courses');
	};

	const onAddCourse = (title: string, description: string, price: number, drive_link: string) => {
		dispatch(addCourse(title, description, price, drive_link, base64String ? (base64String as string) : null));
		history.push('/courses');
	};

	const onAddTask = () => {
		dispatch(addTask(course?.course_id as number, taskName, maxGrade as number, taskFile as string, fileName));
		history.push('/courses');
	};

	const onDownloadTask = async (task_id: number) => {
		const res = await courseAPI.getTaskFile(task_id, userId as number);
		saveAs(`https://sulfur-tech-edu.herokuapp.com/course/task/download-task-file/${task_id}`);
		alert('You have downloaded file');
	};

	const onDownloadTaskSolution = async (task_id: number, uploadedByUserId: number) => {
		const res = await courseAPI.getTaskSolutionTask(task_id, uploadedByUserId, userId as number);
		saveAs(`https://sulfur-tech-edu.herokuapp.com/course/task/download-solution-file/${task_id}`);
		alert('You have downloaded file');
	};

	const onSendMark = async (taskId: number, currentUserId: number, maxMark: number) => {
		mark && Number(mark) > maxMark ? alert(`Can't set more than max mark, try again`) : dispatch(addSolutionMark(taskId, Number(mark), currentUserId as number));
		history.push('/courses');
	};

	const onSubmit = (values: FormTypes, props: any) => {
		const { title, description, price, drive_link } = values;
		course ? onUpdateCourse(course.course_id, title, description, Number(price)) : onAddCourse(title, description, Number(price), drive_link);
		props.resetForm();
		props.setSubmitting(false);
	};

	console.log(course);

	if (!isAuth) return <Redirect to='/authentication/login' />;

	return (
		<div className={`${course ? '' : 'container'}`}>
			<BackButton />
			<div className='course'>
				<div className='photo-container'>
					<img alt='' src={course ? course.image : mockedCourse.image} />
				</div>
				<div className='create-course'>
					{!course && (
						<>
							<p className='title'>New course</p>
							<p className='text'>*necessarily</p>
						</>
					)}
					<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
						{(props) => (
							<Form className='form-container'>
								<Field className='formik-field' name='title' placeholder='Title*' required />
								{props.errors.title || props.touched.title ? <div className='form-error'>{props.errors.title}</div> : <div></div>}

								<Field className='formik-field description-field' name='description' placeholder='Description*' required />
								{props.errors.description || props.touched.description ? (
									<div className='form-error'>{props.errors.description}</div>
								) : (
									<div></div>
								)}

								<Field className='formik-field' name='price' placeholder='Price*' type='number' required />
								{props.errors.price || props.touched.price ? <div className='form-error'>{props.errors.price}</div> : <div></div>}

								<Field className='formik-field' name='drive_link' placeholder='Drive link*' required />
								{props.errors.drive_link || props.touched.drive_link ? (
									<div className='form-error'>{props.errors.drive_link}</div>
								) : (
									<div></div>
								)}

								<input className='formik-field' accept='.jpef, .png, .jpg' type='file' onChange={photoUpload} />

								<div className='btn-container'>
									<Button className='form-btn' type='submit' variant='contained' disabled={props.isSubmitting}>
										{props.isSubmitting ? 'Loading' : course ? 'Edit course' : 'Add course'}
									</Button>
									{course && (
										<Button
											className='form-btn red-color'
											onClick={onDeleteCourse}
											variant='contained'
											disabled={props.isSubmitting}
										>
											{props.isSubmitting ? 'Loading' : 'Delete course'}
										</Button>
									)}
								</div>

								{course &&
									course.tasks?.map((t) => {
										return (
											<div>
												<p className='task-title' onClick={() => onDownloadTask(t.task_id)}>
													{t.name}
												</p>
												<p>Solutions:</p>
												{t.solution.map((s) => {
													return (
														<>
															<div className='solution-container'>
																<p className='download-solution' onClick={() => onDownloadTaskSolution(t.task_id, s.user_id)}>Download solution send by {s.user_name}</p>
																<p className='solution-mark'>{s.grade ? s.grade : 0}/{t.max_grade}</p>
															</div>
															<p className='set-mark' onClick={() => onSendMark(t.task_id, s.user_id, t.max_grade)}>Set Mark</p>
															<input type='number' value={mark} onChange={(e: any) => setMark(e.target.value)} />
														</>
													);
												})}
											</div>
										);
									})}

								{userId === course?.creator_id && (
									<>
										<input
											onChange={(e) => taskNameUpload(e)}
											className='formik-field'
											value={taskName}
											placeholder='Task name*'
											required
										/>

										<input
											onChange={(e) => taskMaxGradeUpload(e)}
											type='number'
											className='formik-field'
											value={maxGrade}
											placeholder='Max grade*'
											required
										/>

										<input className='formik-field' type='file' onChange={(e) => fileUpload(e)} />

										<div className='btn-container'>
											<Button
												onClick={onAddTask}
												className='form-btn'
												type='submit'
												variant='contained'
												disabled={props.isSubmitting}
											>
												{props.isSubmitting ? 'Loading' : 'Create Task'}
											</Button>
										</div>
									</>
								)}
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
});

export default CourseForm;
