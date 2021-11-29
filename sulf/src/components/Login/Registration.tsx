import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { registration } from '../../redux/auth-reducer';
import * as Yup from 'yup';
import './LoginPage.sass'

type FormTypes = {
	name: string;
	surname: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const Registration: React.FC = memo(() => {
	const dispatch = useDispatch()

	const initialValues: FormTypes = {
		name: '',
		surname: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Required'),
		surname: Yup.string().required('Required'),
		email: Yup.string().email('Please enter valid email').required('Required'),
		password: Yup.string().min(4, 'Password too Short!').max(10, 'Password too Long!').required('Required'),
		confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required')
	});

	const onSubmit = (values: FormTypes, props: any) => {
		const { name, surname, email, password } = values;
		dispatch(registration(name, surname, email, password))
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
									<Field 
										as={TextField} 
										label='Name' 
										name='name' 
										placeholder='Enter name' 
										fullWidth 
										required 
									/>
									{props.errors.name || props.touched.name ? <div className='form-error'>{props.errors.name}</div> : null}
								</div>
								<div>
									<Field 
										as={TextField} 
										label='Surname' 
										name='surname' 
										placeholder='Enter surname' 
										fullWidth 
										required 
									/>
									{props.errors.surname || props.touched.surname ? <div className='form-error'>{props.errors.surname}</div> : null}
								</div>
							</div>
							<Field
								as={TextField}
								className='formik-field'
								label='Email'
								name='email'
								placeholder='Enter email'
								fullWidth
								required
							/>
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
								name='confirmPassword'
								placeholder='Confirm password'
								type='password'
								fullWidth
								required
							/>
							{props.errors.confirmPassword || props.touched.confirmPassword ? <div className='form-error'>{props.errors.confirmPassword}</div> : null}
							<div className='btn-container'>
								<Button className='form-btn' type='submit' variant='contained' disabled={props.isSubmitting} >
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
