import { exoticClassPerks } from "./exoticClassPerks";
import { getInventoryItemDef, getSandboxPerkDef } from "@d2api/manifest-web";
import PerkIcon from "./PerkIcon";
import './App.css';

export default function ExoticSquare({inventory, perks, item}) {
    let randomPerks = exoticClassPerks[item];

    let square = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ]

    // console.log(inventory.length)

    for(let i = 0; i < inventory.length; i++) {
        let currentPerks = perks[inventory[i].itemInstanceId].perks
        let perkHashes = [];

        for(let j = 0; j < currentPerks.length; j++) {
            if(randomPerks.col1.indexOf(currentPerks[j].perkHash) !== -1 || randomPerks.col2.indexOf(currentPerks[j].perkHash) !== -1 ) {
                perkHashes.push(currentPerks[j].perkHash)
            }
        }

        let p1Index = randomPerks.col1.indexOf(perkHashes[0])
        let p2Index = randomPerks.col2.indexOf(perkHashes[1])
        square[p1Index][p2Index]++;
    }

    return (
        <div  className="exoticSquare-inside">
        <div style={{"display" : "flex", "justify-content" : "flex-start"}} >
            <div style={{"width" : "calc(100% / 10)"}} >
                <img className="item" src={"https://www.bungie.net/" + getInventoryItemDef(item).displayProperties.icon} alt="" ></img>
            </div>
            
            {randomPerks.col1.map(perk => 
                <div style={{"width" : "calc(100% / 10)"}} className="square">
                    <PerkIcon perk={perk}></PerkIcon>
                </div>
            )}
        </div>
        {square.map((row, i) => 
        <div style={{"display" : "flex"}}>
            <div style={{"width" : "calc(100% / 10)"}} className="square">
                <PerkIcon perk={randomPerks.col2[i]}></PerkIcon>
            </div>
            {row.map((cell, j) => 
                <div onClick={() => handleDimCopy(randomPerks.col1[i], randomPerks.col2[j])} className="heatmapItem" style={{ "background-color" : `${cell > 0 ? "#119822" : "#002A32"}`}}>
                    {cell > 0 && 
                        <img src="https://destinyitemmanager.com/favicon-32x32.png" className="dim-img" alt="" ></img>
                    } 
                   <div style={{"display" : "flex", "justifyContent" : "center", "alignItems" : "center", "height" : "100%"}}>    
                        <div>
                        {cell}
                        </div>
                   </div>
                </div>
            )}
        </div>
        )}
        </div>
    )
}

function handleDimCopy(perk1, perk2) {
    console.log(perk1, perk2)
    let perk1Name = getSandboxPerkDef(perk1).displayProperties.name
    let perk2Name = getSandboxPerkDef(perk2).displayProperties.name
    setClipboard(`exactPerk:"${perk1Name}" and exactPerk:"${perk2Name}"`)
}


async function setClipboard(text) {
    const type = "text/plain";
    const blob = new Blob([text], { type });
    const data = [new ClipboardItem({ [type]: blob })];
    await navigator.clipboard.write(data);
  }