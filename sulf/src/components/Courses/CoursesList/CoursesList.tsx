import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CourseType } from '../../../types';
import './CoursesList.sass'

type PropsType = {
    courses: Array<CourseType>;
}

const CoursesList: React.FC<PropsType> = memo(({ courses }) => {   
    const history = useHistory();
    if (!courses.length) {
        return (
            <h2 className='warn-text'>
                Courses not found!
            </h2>
        )
    }

    return (
        <div className='courses-list-container'>
            <p className='slogan'>Join us to teach and study</p>
                <TransitionGroup>
                    {courses.map(course =>
                        <CSSTransition
                            key={course.id}
                            timeout={500}
                            classNames='course'
                        >
                            <div key={course.id} className='wrapper' onClick={() => history.push(`/courses/${course.id}`)}>
                                <div className='photo-container'>
                                    <img alt='' src={course.image} />
                                </div>
                                <div className='text-container'>
                                    <p className='title'><span className='bold-text'>Name:</span> {course.title}</p>
                                    <p className='description'><span className='bold-text'>Description:</span> {course.description}</p>
                                </div>
                            </div>
                        </CSSTransition>
                    )}
                </TransitionGroup>
        </div>
    );
});

export default CoursesList;