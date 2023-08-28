import React from 'react';
import { useIPContext } from '../contexts/IPContext';

function Info() {

    const { ipData } = useIPContext();

    return ( <>
        <div className='info'>
            <div className='info__item'>
                <h2>IP Address</h2>
                <p>{ipData.ip}</p>
            </div>
            <div className='info__item'>
                <h2>Location</h2>
                <p>{ipData.location.city}, {ipData.location.region} {ipData.location.postalCode}</p>
            </div>
            <div className='info__item'>
                <h2>Timezone</h2>
                <p>UTC {ipData.location.timezone}</p>
            </div>
            <div className='info__item'>
                <h2>ISP</h2>
                <p>{ipData.isp}</p>
            </div>
        </div>
    </> );
}

export default Info;