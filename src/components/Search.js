import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useIPify from '../hooks/useIPify';
import Info from './Info';
import arrow from '../images/icon-arrow.svg';

function Search() {
    const [input, setInput] = useState('');
    const { loading, error, fetchData } = useIPify();

    useEffect(() => {
        getclientIP();
    }, []);

    const getclientIP = async (retryCount = 0) => {
        const timeoutDuration = 5000;

        try {
            const res = await Promise.race([
                axios.get('https://api.ipify.org?format=json'),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), timeoutDuration))
            ]);

            fetchData(res.data.ip, 'ip');
        } catch (error) {
            if (retryCount < 3) {
                console.log(`Retrying request... Retry count: ${retryCount + 1}`);
                getclientIP(retryCount + 1);
            } else {
                console.error('Max retry count reached. Error:', error);
            }
        }
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

                <Info loading={loading} error={error} />
            </div>
        </>
    );
}

export default Search;