import { useState } from 'react';
import axios from 'axios';
import { useIPContext } from '../contexts/IPContext';

function useIPify() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { setIPContextData } = useIPContext();

    const fetchData = async (input, type) => {
        try {
            setLoading(true);
            setError(null);

            let res = ''

            //check if input is IP/domain
            if (type === 'ip') {
                res = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_VjS2ZMtJAgeWvjKVOplfW9yL2WPJb&ipAddress=${input}`);
            } else {
                res = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_VjS2ZMtJAgeWvjKVOplfW9yL2WPJb&domain=${input}`);
            }

            setData(res.data);
            setIPContextData(res.data);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchData };
}

export default useIPify;