import React, { memo, useEffect, useState } from 'react';
import { compose } from 'redux';
import { useCourses } from './CoursesFilter/hook/useCourses';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import CoursesList from './CoursesList/CoursesList';
import './CoursesPage.sass';
import { courses } from './mockedData';
import { getCourses } from '../../redux/admin-reducer';
import { useDispatch } from 'react-redux';

const CoursesPage: React.FC = memo(() => {
    const [filter, setFilter] = useState({ query: '', minPrice: '', maxPrice: '', rating: '' });
    const dispatch = useDispatch();
    const sortedAndSearchedCourses = useCourses(courses, filter.query, filter.minPrice, filter.maxPrice, filter.rating);

    const fetchCourses = async () => {
        const courses = dispatch(getCourses({name: '', minimal_rating: 1, min_price: 0, max_price: 9999, page: 1, per_page: 10}))
        console.log(courses);
    }

    useEffect(() => {
        fetchCourses();
    }, [])

    return (
        <div>
            <CoursesList courses={sortedAndSearchedCourses} filter={filter} setFilter={setFilter}/>
        </div>
    );
});

export default compose<React.ComponentType>(withAuthRedirect)(CoursesPage);
