import { useState, useEffect , useRef, useContext} from 'react';
import authContext from './authContext';
import Inventory from './Inventory';

export default function Login() {
    const [response, setResponse] = useState(null);
    const effectRan = useRef(false);
    const [inv, setInv] = useState(null);
    const { setAuthenticated } = useContext(authContext);



    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('code');
        let authcode = myParam;
        let clientid = process.env.REACT_APP_CLIENT_ID;
        async function startFetching() {
            let res = await fetch("https://www.bungie.net/Platform/App/OAuth/Token/", { 
                method: 'POST', 
                headers: new Headers({
                    "Content-Type" : "application/x-www-form-urlencoded",
                }),
                body : `client_id=${clientid}&grant_type=authorization_code&code=${authcode}`
            })
            res = res.json();
            return res;
        }

        async function getInv(memid) {
                let res = await fetch(`https://www.bungie.net/Platform/Destiny2/-1/Profile/${memid}/LinkedProfiles/?getAllMemberships=true`, { 
                    method: 'Get', 
                    headers: new Headers({
                        "X-API-Key": process.env.REACT_APP_API_KEY,
                        "Authorization": "Bearer"  + localStorage.getItem("access-token")
                    }),
                })
                res = res.json();
                return res;

        }

        async function fetchBoth() {
            const tempResponse = await startFetching()
            const tempInv = await getInv(tempResponse.membership_id)
            setResponse(tempResponse)
            setInv(tempInv)
        }

        if (!effectRan.current) {
            fetchBoth()
        }

        return () => {
            effectRan.current = true;
        }
      }, [inv, response]);





    if(response != null && inv != null) {
        setAuthenticated(true)
        localStorage.setItem("profile-icon", inv.Response.bnetMembership.iconPath)
        localStorage.setItem("destiny-name", inv.Response.bnetMembership.supplementalDisplayName)
        localStorage.setItem("membershipType", inv.Response.profiles[0].membershipType)
        localStorage.setItem("destiny_membership_id", inv.Response.profiles[0].membershipId)
        localStorage.setItem("access-token", response.access_token);
        localStorage.setItem("membership-id", response.membership_id);
        return  (
            <>
                <Inventory></Inventory>
            </>
        );
    }


    //   return <div className='overlay-box'> 
    //     <div className='circle'></div> 
    //   </div>
}