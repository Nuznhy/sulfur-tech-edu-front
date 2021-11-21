import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getIsAuth } from '../../redux/auth-selectors';
import { FilterType } from '../../types';
import './Header.sass'
import SearchInput from './SearchInput/SearchInput';

type PropsType = {
    filter: FilterType;
    setFilter: (filter: FilterType) => void;
}

const Header: React.FC<PropsType> = memo(({ filter, setFilter }) => {
    const isAuth = useSelector(getIsAuth);

    return (
        <div className='header-container'>
            <p className='text'>Header</p>
            <SearchInput 
                value={filter.query}
                onChange={(e: any) => setFilter({...filter, query: e.target.value})}
                placeholder="Search..."
            />
            {isAuth ? <Link className='link' to='/profile'>Profile</Link> : <Link className='link' to='/authentification'>Login</Link>}
        </div>
    );
});

export default Header;