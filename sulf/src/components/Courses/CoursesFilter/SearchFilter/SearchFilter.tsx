import React from 'react';
import './SearchFilter.sass'

type PropsType = {
    value: string,
    onChange: (e: any) => void,
    placeholder: string,
    type: string
}

const SearchFilter: React.FC<PropsType> = React.forwardRef((props, ref: any) => {
    return (
        <div>
            <input ref={ref} className={`input ${props.type === 'text' ? 'text-input' : 'number-input'}`} {...props}/>
        </div>
    );
});

export default SearchFilter;