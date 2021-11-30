import React, { memo } from 'react';
import { FilterType } from '../../../types';
import './CoursesFilter.sass';
import RatingFilter from './RatingFilter/RatingFilter';
import SearchFilter from './SearchFilter/SearchFilter';

type PropsType = {
	filter: FilterType;
	setFilter: (filter: FilterType) => void;
};

const CoursesFilter: React.FC<PropsType> = memo(({ filter, setFilter }) => {
	console.log(filter);
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
                <RatingFilter 
                    value={filter.rating}
                    onChange={(e: string) => setFilter({ ...filter, rating: e })}
                />
			</div>
		</div>
	);
});

export default CoursesFilter;
