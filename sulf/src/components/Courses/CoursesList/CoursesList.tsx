import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { CourseType, FilterType } from '../../../types';
import CoursesFilter from '../CoursesFilter/CoursesFilter';
import StyledRating from '../CoursesFilter/RatingFilter/StyledRating';
import './CoursesList.sass';

type PropsType = {
	courses: Array<CourseType>;
	filter: FilterType;
	setFilter: (filter: FilterType) => void;
};

const CoursesList: React.FC<PropsType> = memo(({ courses, filter, setFilter }) => {
	const history = useHistory();

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
						<div key={course.id} className='item'>
							<div className='photo-container' onClick={() => history.push(`/courses/${course.id}`)}>
								<img alt='' src={course.image} />
							</div>
							<div className='text-container' onClick={() => history.push(`/courses/${course.id}`)}>
								<p className='title'>
									<span className='title-text bold-text'>{course.title}</span>
								</p>
								<p className='description'>
									{course.description.length < 220 ? course.description : `${course.description.substr(0, 220)}...`}
								</p>
								<p className='price left-align'>
									<span className='bold-text'>Price:</span> {course.price}
								</p>
								<p className='rating left-align'>
									<span className='bold-text'>Rating:</span>
									<div className='heart-icons'>
										<StyledRating value={course.rating.toString()} />
									</div>
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
});

export default CoursesList;
