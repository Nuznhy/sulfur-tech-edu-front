import React, { memo } from 'react';
import Loader from "react-loader-spinner";
import './Preloader.sass';

const Preloader: React.FC = memo(() => {
    return (
        <div className='loader-container'>
            <Loader
                type="Puff"
                color="#34C78E"
                height={100}
                width={100}
            />
        </div>
    );
});

export default Preloader;