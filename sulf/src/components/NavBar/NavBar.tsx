import React, { memo, useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import './NavBar.sass';

const NavBar: React.FC = memo(() => {
  const [isCoursesPage, setIsCoursePage] = useState(false)
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    setIsCoursePage(history.location.pathname === '/courses')
  }, [location])

  return (
    <div className={`${isCoursesPage ? 'navBar full-height' : 'navBar'}`}>
      <NavLink to='/profile' className='link'>
        Profile
      </NavLink>
      <NavLink to='/authentification' className='link'>
        Login
      </NavLink>
      <NavLink to='/courses' className='link'>
        Courses
      </NavLink>
      <NavLink to='/settings' className='link'>
        Settings
      </NavLink>
    </div>
  );
});

export default NavBar;
