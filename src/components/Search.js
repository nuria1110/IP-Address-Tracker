import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useIPify from '../hooks/useIPify';
import Info from './Info';
import arrow from '../images/icon-arrow.svg';

function Search() {
    const [input, setInput] = useState('');
    const { data, loading, error, fetchData } = useIPify();

    useEffect(() => {
        getclientIP();
    }, []);

    const getclientIP = async () => {
        const res = await axios.get('https://api.ipify.org?format=json');
        fetchData(res.data.ip, 'ip');
    };

    const handleSearch = () => {
        const res = inputCheck(input);
        if (res === 'invalid') {
            alert('Please enter a valid IP address or domain');
            return;
        } else {
            fetchData(input, res);
        }
    };

    function inputCheck(input) {
        // ip regex
        const ipRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
    
        // domain regex
        const domainRegex = /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/;
    
        if (ipRegex.test(input)) {
            return 'ip';
        } else if (domainRegex.test(input)) {
            return 'domain';
        } else {
            return 'invalid';
        }
    }

    return (
        <>
            <div className='search'>
                <h1>IP Address Tracker</h1>

                <div className='search__searchbar'>
                    <input
                        className='search__input'
                        type='text'
                        placeholder='Search for any IP address or domain'
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button className='search__btn' onClick={handleSearch}>
                        <img src={arrow} alt='arrow' />
                    </button>
                </div>

                {data !== null && !loading && error === null ? <Info/> : ''}
            </div>
        </>
    );
}

export default Search;