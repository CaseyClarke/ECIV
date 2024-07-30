import {setApiKey, loadDefs, includeTables } from '@d2api/manifest-web';
import Login from './Login';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css'

export default function Manifest() {
    const [response, setResponse] = useState(null);
    setApiKey(process.env.REACT_APP_API_KEY);
    includeTables(['InventoryItem', 'SandboxPerk']);
    useEffect (() => {
        async function loadManifest() {
            let res = await loadDefs()
            setResponse(res);
        }
            loadManifest()
    }, [])

    if(response != null) {
        return (
            <>
            {new URLSearchParams(window.location.search).get("code") && 
                <Login></Login>
            }
            </>
        )
    }

    // return <div className='overlay-box'> 
    //     <div className='circle'>
    //     </div> 
    // </div>
}