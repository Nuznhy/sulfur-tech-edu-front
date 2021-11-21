import React from 'react';
import './SearchInput.sass'

type PropsType = {
    value: string,
    onChange: (e: any) => void,
    placeholder: string,
    type?: string
}

const SearchInput: React.FC<PropsType> = React.forwardRef((props, ref: any) => {
    return (
        <div>
            <input ref={ref} className='my-input' {...props}/>
        </div>
    );
});

export default SearchInput;