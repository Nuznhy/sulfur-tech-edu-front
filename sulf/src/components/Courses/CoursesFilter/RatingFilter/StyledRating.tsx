import React, { SyntheticEvent } from 'react';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

type PropsType = {
	value: string;
	onChange?: (e: string) => void;
};

const StyledRating: React.FC<PropsType> = ({ value, onChange }) => {
    const onRatingChange = (rating: SyntheticEvent<Element, Event>) => {
		onChange && onChange((rating.target as HTMLTextAreaElement).value);
	};

    const CustomStyledRating = styled(Rating)({
		'& .MuiRating-iconFilled': {
			color: '#ff6d75',
		},
		'& .MuiRating-iconHover': {
			color: '#ff3d47',
		},
	});

    return (
        <CustomStyledRating
            name='customized-color'
            defaultValue={Number(value)}
            onChange={onRatingChange}
            precision={1}
            icon={<FavoriteIcon fontSize='inherit' />}
            emptyIcon={<FavoriteBorderIcon fontSize='inherit' />}
        />
    );
};

export default StyledRating;