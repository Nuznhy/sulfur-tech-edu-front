import { Button } from '@material-ui/core';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUserRole } from '../../../redux/auth-selectors';
import { FilterType } from '../../../types';
import RatingFilter from './RatingFilter/RatingFilter';
import SearchFilter from './SearchFilter/SearchFilter';
import './CoursesFilter.sass';

type PropsType = {
	filter: FilterType;
	setFilter: (filter: FilterType) => void;
};

const CoursesFilter: React.FC<PropsType> = memo(({ filter, setFilter }) => {
	const history = useHistory();

	return (
		<div className='filter-container'>
			<div>
				<p className='filter-title'>Search</p>
				<SearchFilter
					value={filter.query}
					onChange={(e: any) => setFilter({ ...filter, query: e.target.value })}
					placeholder='Search...'
					type='text'
				/>
			</div>
			<div>
				<p className='filter-title'>Price</p>
				<div className='price-filter'>
					<SearchFilter
						value={filter.minPrice}
						onChange={(e: any) => setFilter({ ...filter, minPrice: e.target.value })}
						placeholder='0000'
						type='number'
					/>
					<div className='line'></div>
					<SearchFilter
						value={filter.maxPrice}
						onChange={(e: any) => setFilter({ ...filter, maxPrice: e.target.value })}
						placeholder='0000'
						type='number'
					/>
				</div>
			</div>
			<div>
				<p className='filter-title'>Rating</p>
				<RatingFilter value={filter.rating} onChange={(e: string) => setFilter({ ...filter, rating: e })} />
			</div>
			<div>
				<Button onClick={() => history.push(`/create-course`)} className='create-course-btn'>
					Create course
				</Button>
			</div>
		</div>
	);
});

export default CoursesFilter;
