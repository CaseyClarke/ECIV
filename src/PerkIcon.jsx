import { getSandboxPerkDef } from "@d2api/manifest-web"
import './App.css'

export default function PerkIcon({perk}) {
    let display = getSandboxPerkDef(perk).displayProperties
    return (
        <div className="square-inside">
            <img src={"https://www.bungie.net/" + display.icon} className="perk"></img>
        </div>
    )
}