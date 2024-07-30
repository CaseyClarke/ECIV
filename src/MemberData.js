import { useState, useEffect , useRef} from 'react';
import Inventory from './Inventory';
import React, { useContext } from "react";
import authContext from "./authContext";



export default function MemberData()  {
    const [inv, setInv] = useState(null);
    const effectRan = useRef(false);
    const { setAuthenticated } = useContext(authContext);

    useEffect(() => {
        async function getInv() {
            let memid = localStorage.getItem("membership-id")
            let res = await fetch(`https://www.bungie.net/Platform/Destiny2/-1/Profile/${memid}/LinkedProfiles/?getAllMemberships=true`, { 
                method: 'Get', 
                headers: new Headers({
                    "X-API-Key": process.env.REACT_APP_API_KEY,
                    "Authorization": "Bearer"  + localStorage.getItem("access-token")
                }),
            })
            res = await res.json();
            setInv(res);
        }

        if (!effectRan.current) {
            getInv()
            setAuthenticated(true)
        }
        return () => {
            effectRan.current = true;
        }
      }, [inv]);
       if(inv != null) {
        localStorage.setItem("membershipType", inv.Response.profiles[0].membershipType)
        localStorage.setItem("destiny_membership_id", inv.Response.profiles[0].membershipId)
        return (
            <>
            {/* <div>{JSON.stringify(inv)}</div> */}
            <Inventory></Inventory>
            </>
        );
       }

//     return <div className='overlay-box'> 
//        <div className='circle'>
//        </div> 
//    </div>
}