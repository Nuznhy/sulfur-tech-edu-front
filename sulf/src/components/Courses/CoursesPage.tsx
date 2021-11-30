import React, { memo, useState } from 'react';
import { compose } from 'redux';
import { useCourses } from './CoursesFilter/hook/useCourses';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import CoursesList from './CoursesList/CoursesList';
import './CoursesPage.sass';
import { courses } from './mockedData';

const CoursesPage: React.FC = memo(() => {
    const [filter, setFilter] = useState({ query: '', minPrice: '', maxPrice: '', rating: '' });
    const sortedAndSearchedCourses = useCourses(courses, filter.query, filter.minPrice, filter.maxPrice, filter.rating);

    return (
        <div>
            <CoursesList courses={sortedAndSearchedCourses} filter={filter} setFilter={setFilter}/>
        </div>
    );
});

export default compose<React.ComponentType>(withAuthRedirect)(CoursesPage);
