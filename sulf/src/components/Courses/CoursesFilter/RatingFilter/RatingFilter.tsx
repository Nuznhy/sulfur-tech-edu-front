import React, { memo, SyntheticEvent } from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './RatingFilter.sass';

type PropsType = {
	value: string;
	onChange: (e: string) => void;
};

const StyledRating = styled(Rating)({
	'& .MuiRating-iconFilled': {
		color: '#ff6d75',
	},
	'& .MuiRating-iconHover': {
		color: '#ff3d47',
	},
});

const RatingFilter: React.FC<PropsType> = memo(({ value, onChange }) => {
	const onRatingChange = (rating: SyntheticEvent<Element, Event>) => {
		onChange((rating.target as HTMLTextAreaElement).value);
	};

	return (
		<div className='rating'>
			<StyledRating
				name='customized-color'
				defaultValue={Number(value)}
				onChange={onRatingChange}
				precision={1}
				icon={<FavoriteIcon fontSize='inherit' />}
				emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
			/>
		</div>
	);
});

export default RatingFilter;
