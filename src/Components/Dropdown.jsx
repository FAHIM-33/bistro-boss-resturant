import { useState, useEffect, useRef } from 'react';

const Dropdown = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);


    const handleClickOut = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOut)
        return () => document.removeEventListener('mouseup', handleClickOut)
    }, [])


    return (
        <li className='kochur-dropdown' ref={dropdownRef}>
            <button onClick={() => setOpen(!open)}>Dropdown</button>
            {open &&
                <ul className='absolute top-10 bg-[#333] left-0 right-0'>
                    <li>item</li>
                    <li>item</li>
                    <li>item</li>
                    <li>item</li>
                    <li>item</li>
                    <li>item</li>
                </ul>
            }
        </li>
    );
};

export default Dropdown;
