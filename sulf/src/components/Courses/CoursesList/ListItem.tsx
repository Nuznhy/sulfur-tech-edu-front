import React, { memo } from 'react';
import { useHistory } from 'react-router';
import { CourseType } from '../../../types';
import StyledRating from '../CoursesFilter/RatingFilter/StyledRating';
import './ListItem.sass';

type PropsType = {
    course: CourseType;
};

const ListItem: React.FC<PropsType> = memo(({ course }) => {
    const history = useHistory();

    return (
        <div key={course.id} className='item'>
            <div className='photo-container' onClick={() => history.push(`/courses/${course.id}`)}>
                <img alt='' src={course.image} className={history.location.pathname === '/profile' ? 'left-margin' : ''}/>
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
    );
});

export default ListItem;