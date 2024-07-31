import './index.css'
import './App.css'
import { getInventoryItemDef } from '@d2api/manifest-web';
import { getSandboxPerkDef } from '@d2api/manifest-web';
import { exoticClassPerks } from './exoticClassPerks';

export default function Item({data, perks}) {
    let item = getInventoryItemDef(data.itemHash)
    let icon = "https://www.bungie.net/" + item.displayProperties.icon;


    let randomPerks = exoticClassPerks[data.itemHash];
    let perkHashes = [];

    for(let j = 0; j < perks.length; j++) {
        if(randomPerks.col1.indexOf(perks[j].perkHash) !== -1 || randomPerks.col2.indexOf(perks[j].perkHash) !== -1 ) {
            perkHashes.push(perks[j].perkHash)
        }
    }

    let p1Display = getSandboxPerkDef(perkHashes[0]).displayProperties
    let p2Display = getSandboxPerkDef(perkHashes[1]).displayProperties
    return (
        <div className='item'>
            <img src={icon} alt="" ></img>
            <div className='hide'>
                <img src={"https://www.bungie.net/" + p1Display.icon} alt="" ></img>
                <img src={"https://www.bungie.net/" + p2Display.icon} alt="" ></img>
            </div>
        </div>
    );
}

