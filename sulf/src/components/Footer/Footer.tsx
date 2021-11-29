import React, { memo } from 'react';
import { useLocation } from 'react-router';
import './Footer.sass'

const Footer: React.FC = memo(() => {
    const searchQuery = useLocation().pathname.split('/')[1]

    return (
        <>
            {searchQuery !== 'authentication' ? <div className='footer-bg'></div> : null}
        </>
    );
});

export default Footer;