import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUserRole } from '../../../redux/auth-selectors';
import { CourseType, FilterType } from '../../../types';
import CoursesFilter from '../CoursesFilter/CoursesFilter';
import './CoursesList.sass';
import ListItem from './ListItem'

type PropsType = {
	courses: Array<CourseType>;
	filter: FilterType;
	setFilter: (filter: FilterType) => void;
};

const CoursesList: React.FC<PropsType> = memo(({ courses, filter, setFilter }) => {
	const history = useHistory();
	const isAdmin = useSelector(getUserRole) === 'admin';

	return (
		<div className='courses-list-container'>
			<p className='slogan'>
				Join us to <span className='green-text'>teach</span> and <span className='green-text'>study</span>
			</p>
			<CoursesFilter filter={filter} setFilter={setFilter} />
			{isAdmin && <button onClick={() => history.push(`/create-course`)}>Create Course</button>}
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
