import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CourseType, FilterType } from '../../../types';
import CoursesFilter from '../CoursesFilter/CoursesFilter';
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
				<TransitionGroup>
					{courses.map((course) => (
						<CSSTransition key={course.id} timeout={500} classNames='course'>
							<div key={course.id} className='wrapper' onClick={() => history.push(`/courses/${course.id}`)}>
								<div className='photo-container'>
									<img alt='' src={course.image} />
								</div>
								<div className='text-container'>
									<p className='title'>
										<span className='bold-text'>Name:</span> {course.title}
									</p>
									<p className='description'>
										<span className='bold-text'>Description:</span> {course.description}
									</p>
                                    <p>
                                        Price: {course.price}
                                    </p>
                                    <p>
                                        Rating: {course.rating}
                                    </p>
								</div>
							</div>
						</CSSTransition>
					))}
				</TransitionGroup>
			)}
		</div>
	);
});

export default CoursesList;
