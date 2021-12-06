import React, { memo } from 'react';
import { CourseType, FilterType } from '../../../types';
import CoursesFilter from '../CoursesFilter/CoursesFilter';
import ListItem from './ListItem';
import './CoursesList.sass';

type PropsType = {
	courses: Array<CourseType>;
	filter: FilterType;
	setFilter: (filter: FilterType) => void;
};

const CoursesList: React.FC<PropsType> = memo(({ courses, filter, setFilter }) => {
	return (
		<div className='courses-list-container'>
			<p className='slogan'>
				Join us to <span className='green-text'>teach</span> and <span className='green-text'>study</span>
			</p>
			<CoursesFilter filter={filter} setFilter={setFilter} />
			{!courses.length ? (
				<h2 className='warn-text'>Courses not found!</h2>
			) : (
				<div className='wrapper'>
					{courses.map((course) => (
						<ListItem course={course}/>
					))}
				</div>
			)}
		</div>
	);
});

export default CoursesList;
