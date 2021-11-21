import React, { memo } from 'react';
import CoursesLogo from '../../images/2.png'
import { FilterType } from '../../types';
import { useCourses } from '../Header/hook/useCourses';
import CoursesList from './CoursesList/CoursesList';
import './CoursesPage.sass';
import { courses } from './mockedData';

type PropsType = {
    filter: FilterType;
}

const CoursesPage: React.FC<PropsType> = memo(({ filter }) => {
    const sortedAndSearchedCourses = useCourses(courses, filter.query);

    return (
        <div className='courses-bg'>
            <CoursesList courses={sortedAndSearchedCourses}/>
        </div>
    );
});

export default CoursesPage;