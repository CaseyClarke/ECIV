import { useState, useEffect , useRef} from 'react';
import Item from './Item';
import ExoticSquare from './ExoticSquare';
import './App.css'
import { getInventoryItemDef } from '@d2api/manifest-web';

export default function Inventory() {
    const [classItem, setSelectedItem] = useState(266021826);
    const [inv, setInv] = useState(null);
    const effectRan = useRef(false);
    
    useEffect(() => {
        async function getInv() {
            let memid = localStorage.getItem("destiny_membership_id")
            let res = await fetch(`https://www.bungie.net/Platform/Destiny2/${localStorage.getItem("membershipType")}/Profile/${memid}/?components=102,302`, { 
                method: 'Get', 
                headers: new Headers({
                    "X-API-Key": process.env.REACT_APP_API_KEY,
                    "Authorization": "Bearer "  + localStorage.getItem("access-token")
                }),
            })
            res = await res.json();
            setInv(res);
        }

        if (!effectRan.current) {
            getInv()
        }

        return () => {
            effectRan.current = true;
        }
      }, [inv, classItem]);

      if(inv != null) {
        let inventory = inv.Response.profileInventory.data.items
        let perks = inv.Response.itemComponents.perks.data
        window.history.replaceState({}, "", window.location.href.split("?")[0])

        return (
        <div style={{"margin": "2vh"}}>
            <div style={{"margin": "1vh"}}>
                <h1>{getInventoryItemDef(classItem).displayProperties.name}</h1>
                <label for="classItems" >Choose a Class Item </label>
                <select name="classItems" value={parseInt(classItem)} onChange={e => setSelectedItem(e.target.value)}>
                    <option value={266021826}>Stoicism (Titan)</option>
                    <option value={2273643087}>Solipsism (Warlock)</option>
                    <option value={2809120022}>Relativism (Hunter)</option>
                </select>
            </div>

            <div className='inventoryContainer'>
                <div className='itemContainer' style={{"width" : "50%"}}>
                    {inventory.filter(item => 
                        item.itemHash === parseInt(classItem)
                    )
                    .map(i => 
                        <Item data={i} perks={perks[i.itemInstanceId].perks}></Item>
                    )}
                </div>
                    <div style={{"width" : "50%", "height" : "100%", "overflow" : "hidden"}} >
                        <ExoticSquare inventory={inventory.filter(item => item.itemHash === parseInt(classItem))} perks={perks} item={parseInt(classItem)}></ExoticSquare>
                    </div>
            </div>
        </div>
        )
      }
}