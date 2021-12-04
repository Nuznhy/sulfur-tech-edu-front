import React, { memo, useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import SignInOutContainer from './components/Login/LoginPage';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import store from './redux/redux-store';
import './App.sass';
import Profile from './components/Profile/Profile';
import { authUserThunk } from './redux/auth-reducer';
import { getIsAuth } from './redux/auth-selectors';
import CoursesPage from './components/Courses/CoursesPage';
import Header from './components/Header/Header';
import CoursesItem from './components/Courses/CoursesItem/CoursesItem';
import Footer from './components/Footer/Footer';
import CourseForm from './components/Courses/CourseForm/CourseForm';

const App: React.FC = memo(() => {
	const isAuth = useSelector(getIsAuth)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(authUserThunk())
	}, [])
		
	return (
		<div>
			<div className='app-wrapper'>
				<Header />
				<div className='wrapper'>
					<Switch>
						<Route exact path='/' render={() => <Redirect to='/profile' />} />
						<Route path='/authentication' render={() => <SignInOutContainer />} />
						<Route path='/profile' render={() => <Profile />} />
						<Route exact path='/courses' render={() => <CoursesPage />} />
						<Route exact path='/create-course' render={() => <CourseForm />} />
						<Route exact path='/courses/:id' render={() => <CoursesItem />} />
						<Route path='*' render={() => <div>404 Not found</div>} />
					</Switch>
				</div>
				<Footer />
			</div>	
		</div>
	);
})

let AppContainer = compose<React.ComponentType>(withRouter)(App);

const MainApp: React.FC = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AppContainer />
			</BrowserRouter>
		</Provider>
	);
};

export default MainApp;
