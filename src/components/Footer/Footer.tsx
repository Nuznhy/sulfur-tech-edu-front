import React, { memo } from 'react';
import { useLocation } from 'react-router';
import classNames from 'classnames';
import './Footer.sass';

const Footer: React.FC = memo(() => {
	const searchQuery = useLocation().pathname.split('/')[1];
	let footerClasses = classNames({
		'footer-bg': true,
		hidden: searchQuery === 'authentication' || searchQuery === 'courses' || searchQuery === 'settings',
	});

	return (
		<>
			<div className={footerClasses}></div>
		</>
	);
});

export default Footer;
