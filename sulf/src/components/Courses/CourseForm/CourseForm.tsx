import React, { memo } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button } from '@material-ui/core';
import * as Yup from 'yup';
import { addCourse, updateCourse } from '../../../redux/admin-reducer';
import { CourseType } from '../../../types';
import { getCourseById } from '../mockedData';
import './CourseForm.sass'
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../../../redux/auth-selectors';
import BackButton from '../BackButton/BackButton';

type FormTypes = {
	title: string;
	description: string;
	price: string;
};

type PropsType = {
	course?: CourseType;
};

const CourseForm: React.FC<PropsType> = memo(({ course }) => {
    const mockedCourse = getCourseById(1)[0];
	const isAuth = useSelector(getIsAuth);

	const initialValues: FormTypes = {
		title: course ? course.course_name : '',
		description: course ? course.course_description : '',
		price: course ? course.course_price.toString() : '',
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().max(50, 'Title too Long!').required('Required'),
		description: Yup.string().max(250, 'Description too Long!').required('Required'),
		price: Yup.string().required('Required'),
	});

	const onSubmit = (values: FormTypes, props: any) => {
		const { title, description, price } = values;
		course ? updateCourse(course.course_id, title, description, price) : addCourse(title, description, price);
		props.resetForm();
		props.setSubmitting(false);
	};

    if (!isAuth) return <Redirect to='/authentication/login' />;

	return (
		<div className={`${course ? '' : 'container'}`}>
            <BackButton />
			<div className='course'>
				<div className='photo-container'>
					<img alt='' src={mockedCourse.image} />
				</div>
				<div className='create-course'>
                    {!course &&
                        <>
                            <p className='title'>New course</p>
                            <p className='text'>*necessarily</p>
                        </>
                    }
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

								<div className='btn-container'>
									<Button className='form-btn' type='submit' variant='contained' disabled={props.isSubmitting}>
										{props.isSubmitting ? 'Loading' : course ? 'Edit course' : 'Add course'}
									</Button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
});

export default CourseForm;
