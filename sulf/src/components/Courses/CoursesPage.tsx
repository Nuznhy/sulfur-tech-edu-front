import React, { memo, useState } from 'react';
import { compose } from 'redux';
import { FilterType } from '../../types';
import { useCourses } from '../Header/hook/useCourses';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import CoursesList from './CoursesList/CoursesList';
import './CoursesPage.sass';
import { courses } from './mockedData';

const CoursesPage: React.FC = memo(() => {
    const [filter, setFilter] = useState({ query: '' });
    const sortedAndSearchedCourses = useCourses(courses, filter.query);

    return (
        <div>
            <CoursesList courses={sortedAndSearchedCourses}/>
        </div>
    );
});

export default compose<React.ComponentType>(withAuthRedirect)(CoursesPage);
