import React, { memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { useCourses } from './CoursesFilter/hook/useCourses';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import CoursesList from './CoursesList/CoursesList';
import './CoursesPage.sass';
import { getAllCourses, getPageCount } from '../../redux/admin-selectors';
import { useSelector } from 'react-redux';
import { courseAPI } from '../../service/api/course-api';
import Preloader from '../Preloader/Preloader';
import { useLocation } from 'react-router-dom';

const CoursesPage: React.FC = memo(() => {
	const [filter, setFilter] = useState({ query: '', minPrice: '', maxPrice: '', rating: '' });
	const [courses, setCourses] = useState(useSelector(getAllCourses));
	const [pageCount, setPageCount] = useState(useSelector(getPageCount));
	const [isLoading, setIsLoading] = useState(false);
	const location = useLocation();
	
	const sortedAndSearchedCourses = useCourses(courses, filter.query, filter.minPrice, filter.maxPrice, filter.rating);
    
    useEffect(() => {
		fetchCourses();
	}, [location]);
    
	const fetchCourses = async () => {
		setIsLoading(true);
		const res = await courseAPI.getAllCourses({ name: '', minimal_rating: 0, min_price: 0, max_price: 99999, page: 1, per_page: 100 });
        setCourses([...res.data.courses]); 
        setPageCount(res.data.courses.length);
		setIsLoading(false);
	};

	return <div>{isLoading ? <Preloader /> : <CoursesList courses={sortedAndSearchedCourses} filter={filter} setFilter={setFilter} />}</div>;
});

export default compose<React.ComponentType>(withAuthRedirect)(CoursesPage);
