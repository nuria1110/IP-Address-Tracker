import React from 'react';
import { IPProvider } from './contexts/IPContext';
import Search from './components/Search';
import Map from './components/Map';

function App() {
  return (
    <div className="container">
      <main className='container__main'>
        <div className='container__bg'></div>
          <IPProvider>
            <Search />
            <Map />
          </IPProvider>
      </main>
    </div>
  );
}

export default App;
