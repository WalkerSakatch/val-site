import React from 'react'
import {Skin, Weapon} from "@mrbabalafe/valorant-api-helper"
import SkinDisplay from './SkinDisplay'

export default function WeaponDisplay(weapon: Weapon) {
  return (
    <div>
        <h1>{weapon.displayName}</h1>
        {weapon.skins.map((skin: Skin) => (
          <SkinDisplay {...skin}/>
        ))}
    </div>
  )
}
