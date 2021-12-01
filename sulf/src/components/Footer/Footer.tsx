import React, { memo } from 'react';
import { useLocation } from 'react-router';
import './Footer.sass'

let classNames = require('classnames');

const Footer: React.FC = memo(() => {
    const searchQuery = useLocation().pathname.split('/')[1]
    let footerClasses = classNames({
        'footer-bg': true,
        'hidden': searchQuery === 'authentication' || searchQuery === 'profile' || searchQuery === 'courses',
    })

    return (
        <>
            <div className={footerClasses}></div>
        </>
    );
});

export default Footer;