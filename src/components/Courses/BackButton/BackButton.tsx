import React, { memo } from 'react';
import { useHistory } from 'react-router';
import BackArrow from '../../../images/BackArrow.png'
import './BackButton.sass'

const BackButton: React.FC = memo(() => {
    const history = useHistory();

    return (
        <div className='back-btn'>
            <div className='btn-img' onClick={() => history.goBack()}>
                <img alt='' src={BackArrow}/>
            </div>
            <p className='btn-text'>Back</p>
        </div>
    );
});

export default BackButton;