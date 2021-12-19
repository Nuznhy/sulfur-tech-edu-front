import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { login } from '../../redux/auth-reducer';
import './LoginPage.sass'

type FormTypes = {
	email: string;
	password: string;
};

const Login: React.FC = memo(() => {
	const dispatch = useDispatch()

	const initialValues: FormTypes = {
		email: '',
		password: '',
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Please enter valid email').required('Required'),
		password: Yup.string().min(4, 'Password too Short!').max(10, 'Password too Long!').required('Required'),
	});

	const onSubmit = (values: FormTypes, props: any) => {
		const { email, password } = values;
		dispatch(login({email, password}))
		props.resetForm();
		props.setSubmitting(false);
	};

	return (
		<>
			<div className='form-container'>
				<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
					{(props) => (
						<Form>
							<Field
								as={TextField}
								className='formik-field'
								name='email'
								placeholder='Enter email'
								fullWidth
								required
							/>
							{props.errors.email || props.touched.email ? <div className='form-error'>{props.errors.email}</div> : null}
							<Field
								as={TextField}
								className='formik-field'
								name='password'
								placeholder='Enter password'
								type='password'
								fullWidth
								required
							/>
							{props.errors.password || props.touched.password ? <div className='form-error'>{props.errors.password}</div> : null}
							<div className='btn-container'>
								<Button className='form-btn' type='submit' variant='contained' disabled={props.isSubmitting} >
									{props.isSubmitting ? 'Loading' : 'Sign In'}
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</>
	);
});

export default Login;
