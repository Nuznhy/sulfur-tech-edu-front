import React, { memo, useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from './Login';
import Signup from './SignUp';
import { login, registration } from '../../redux/auth-reducer';
import { useSelector } from 'react-redux';
import { getIsAuth } from '../../redux/auth-selectors';
import { Redirect, useHistory } from 'react-router';
import './LoginPage.sass'

const SignInOutContainer: React.FC = memo(() => {
	const [value, setValue] = useState(0);
	const isAuth = useSelector(getIsAuth);
	const history = useHistory();	

	const handleChange = (event: any, newValue: number) => {
		setValue(newValue);
	};

	// useEffect(() => {
	// 	value === 0 ? history.push('/authentification/login') : history.push('/authentification/registration')
	// }, [value])

	const TabPanel: React.FC<any> = (props) => {
		const { children, value, index, ...other } = props;
		return (
			<div role='tabpanel' hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
				{value === index && (
					<Box>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		);
	}

	if (isAuth) return <Redirect to='/profile' />

	return (
		<Paper className='page-container'>
			<Tabs
				value={value}
				indicatorColor='primary'
				textColor='primary'
				variant='fullWidth'
				onChange={handleChange}
				aria-label='disabled tabs example'
			>
				<Tab label='Sign In' />
				<Tab label='Sign Up' />
			</Tabs>
			<TabPanel value={value} index={0}>
				<Login login={login} handleChange={handleChange} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Signup registration={registration} handleChange={handleChange}/>
			</TabPanel>
		</Paper>
	);
});

export default SignInOutContainer;
