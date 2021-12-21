import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { registration } from '../../redux/auth-reducer';
import * as Yup from 'yup';
import './LoginPage.sass';

type FormTypes = {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	repeat_password: string;
};

const Registration: React.FC = memo(() => {
	const dispatch = useDispatch();

	const initialValues: FormTypes = {
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		repeat_password: '',
	};

	const validationSchema = Yup.object().shape({
		first_name: Yup.string().required('Required'),
		last_name: Yup.string().required('Required'),
		email: Yup.string().email('Please enter valid email').required('Required'),
		password: Yup.string().min(4, 'Password too Short!').max(10, 'Password too Long!').required('Required'),
		repeat_password: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Passwords must match')
			.required('Required'),
	});

	const onSubmit = (values: FormTypes, props: any) => {
		const { first_name, last_name, email, password, repeat_password } = values;
		dispatch(registration({ first_name, last_name, email, password, repeat_password }));
		props.resetForm();
		props.setSubmitting(false);
	};

	return (
		<>
			<div className='form-container'>
				<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
					{(props) => (
						<Form>
							<div className='name-fields formik-field'>
								<div>
									<Field as={TextField} label='Name' name='first_name' placeholder='Enter name' fullWidth required />
									{props.errors.first_name || props.touched.first_name ? (
										<div className='form-error'>{props.errors.first_name}</div>
									) : null}
								</div>
								<div>
									<Field as={TextField} label='Surname' name='last_name' placeholder='Enter surname' fullWidth required />
									{props.errors.last_name || props.touched.last_name ? (
										<div className='form-error'>{props.errors.last_name}</div>
									) : null}
								</div>
							</div>
							<Field as={TextField} className='formik-field' label='Email' name='email' placeholder='Enter email' fullWidth required />
							{props.errors.email || props.touched.email ? <div className='form-error'>{props.errors.email}</div> : null}
							<Field
								as={TextField}
								className='formik-field'
								label='Password'
								name='password'
								placeholder='Enter password'
								type='password'
								fullWidth
								required
							/>
							{props.errors.password || props.touched.password ? <div className='form-error'>{props.errors.password}</div> : null}
							<Field
								as={TextField}
								className='formik-field'
								label='Confirm password'
								name='repeat_password'
								placeholder='Confirm password'
								type='password'
								fullWidth
								required
							/>
							{props.errors.repeat_password || props.touched.repeat_password ? (
								<div className='form-error'>{props.errors.repeat_password}</div>
							) : null}
							<div className='btn-container'>
								<Button className='form-btn' type='submit' variant='contained' disabled={props.isSubmitting}>
									{props.isSubmitting ? 'Loading' : 'Sign Up'}
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
});

export default Registration;
