import './App.css';
import authContext from "./authContext";
import { useContext } from 'react';


export default function Header() {
    const auth = useContext(authContext).authenticated;

    return <header>
    <h1>Exotic Class Item Viewer</h1>
    {!auth && <div class="signin" onClick={() =>  auth ? "" : window.location.href =`https://www.bungie.net/en/OAuth/Authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code`}>
        <h2>Sign In</h2>
    
    </div>}
    {auth && <div className='profile'>
        <h1>{window.localStorage.getItem("destiny-name")}</h1>
        <img style={{"border-radius" : "100%", "height" : "55px", "width" : "55px"}} src={"https://www.bungie.net/" + window.localStorage.getItem("profile-icon")}></img>
    </div>}

    </header>

}