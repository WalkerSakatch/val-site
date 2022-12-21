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

        //FIXME: IDK WHY I HAVE TO DO THIS WEIRD ARRAY THING.
        //FIXME: CHROMA SHOULD BE COMING IN AS AN ARRAY, BUT IT
        //FIXME: ISN'T I GUESS? PLEASE FOR THE LOVE OF GOD FIX THIS

        // let chromas:Array<Chroma> = [];
        // chromas.push(skin.chromas);

        // return chromas[0][0].fullRender

        return skin.chromas[0].fullRender;
    }

  return (
    <div>
        <h3>{skin.displayName}</h3>
        <img src={getDisplayIcon(skin)} alt={skin.displayName}></img>
    </div>
  )
}
