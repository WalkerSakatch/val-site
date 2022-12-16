import React from 'react'
import {Skin} from "../../valorant-api-helper/src/api/weapons/definitions/Skin"

export default function SkinDisplay(skin: Skin) {


  return (
    <div>
        <h3>{skin.displayName}</h3>
        <img src={skin.displayIcon || skin.chromas[0].displayIcon} alt={skin.displayName}></img>
    </div>
  )
}
