import React from 'react'
import { useEffect } from 'react';
import {Skin, Chroma} from "@mrbabalafe/valorant-api-helper"

export default function SkinDisplay(skin: Skin) {

    // useEffect(() => {
        // console.log("skin.chromas: ", skin.chromas);
    // }, [skin.chromas])
// 

    useEffect(() => {
        getDisplayIcon(skin)
    }, [])

    function getDisplayIcon(skin: Skin): string {
        return skin.chromas[0].fullRender;
    }

  return (
    <div>
        <h3>{skin.displayName}</h3>
        <img src={getDisplayIcon(skin)} alt={skin.displayName}></img>
    </div>
  )
}
