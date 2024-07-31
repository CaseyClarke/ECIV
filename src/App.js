import './App.css';
import Header from './Header'
import Manifest from './Manifest';
import authContext from "./authContext";
import { useState } from 'react';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  
  return (
    <authContext.Provider value={{ authenticated, setAuthenticated }}>
      <Header></Header>
      <Manifest></Manifest>

    {!authenticated && new URLSearchParams(window.location.search).get("code") && 
          <div className='overlay-box'> 
            <div className='overlay-box'>
              Loading...
            </div>
            <div className='circle'>
          </div> 
    </div>}

    {!authenticated &&
    <h1>oops i forgot a homepage</h1>
    }

    </authContext.Provider>
  );
}

export default App;