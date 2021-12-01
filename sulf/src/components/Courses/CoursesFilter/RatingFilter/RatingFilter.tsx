import React, { memo } from 'react';
import './RatingFilter.sass';
import StyledRating from './StyledRating';

type PropsType = {
	value: string;
	onChange: (e: string) => void;
};

const RatingFilter: React.FC<PropsType> = memo(({ value, onChange }) => {
	return (
		<div className='rating-filter'>
			<StyledRating value={value} onChange={onChange} />
		</div>
	);
});

export default RatingFilter;
