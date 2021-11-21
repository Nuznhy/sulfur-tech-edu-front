import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, Avatar, TextField, Button, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './LoginPage.sass'

type PropsType = {
	login: (email: string, password: string) => void,
	handleChange: (event: any, newValue: number) => void
}

type FormTypes = {
	email: string;
	password: string;
};

const Login: React.FC<PropsType> = memo(({ login, handleChange }) => {
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
		dispatch(login(values.email, values.password))
		setTimeout(() => {
			props.resetForm();
			props.setSubmitting(false);
		}, 1000);
	};

	return (
		<Grid>
			<div className='form-container'>
				<Grid className='avatar-container'>
					<Avatar className='avatar'>
						<LockOutlinedIcon />
					</Avatar>
					<h2>Sign In</h2>
				</Grid>
				<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
					{(props) => (
						<Form>
							<Field
								as={TextField}
								label='Email'
								name='email'
								placeholder='Enter email'
								fullWidth
								required
							/>
							{props.errors.email || props.touched.email ? <div className='form-error'>{props.errors.email}</div> : null}
							<Field
								as={TextField}
								label='Password'
								name='password'
								placeholder='Enter password'
								type='password'
								fullWidth
								required
							/>
							{props.errors.password || props.touched.password ? <div className='form-error'>{props.errors.password}</div> : null}
							<Button className='form-btn' type='submit' color='primary' variant='contained' disabled={props.isSubmitting} fullWidth>
								{props.isSubmitting ? 'Loading' : 'Sign in'}
							</Button>
						</Form>
					)}
				</Formik>
				<Typography>
					<Link href='#' className='form-link'>Forgot password?</Link>
				</Typography>
				<Typography onClick={() => {handleChange('', 1)}}>
					{' '}
					Don't have an account?
					{' '}
					<NavLink to='/authentification/registration' className='form-link'>
						Sign Up
					</NavLink>
				</Typography>
			</div>
		</Grid>
	);
});

export default Login;
