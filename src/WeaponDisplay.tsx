import React from 'react'
// import {Weapon} from "../../valorant-api-helper/src/api/weapons/definitions/Weapon"
import SkinDisplay from './SkinDisplay'

export default function WeaponDisplay(weapon: any) {
  return (
    <div>
        <h1>{weapon.displayName}</h1>
        {weapon.skins.map((skin: any) => (
          <SkinDisplay {...skin}/>
        ))}
    </div>
  )
}
