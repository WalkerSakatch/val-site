import { DOM_KEY_LOCATION } from '@testing-library/user-event/dist/keyboard/types';
import React from 'react'
import { useEffect } from 'react';
import {Skin} from "../../valorant-api-helper/src/api/weapons/definitions/Skin"
import { Chroma } from '../../valorant-api-helper/src/api/weapons/definitions/Chroma';

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

        let chromas:any = [];
        chromas.push(skin.chromas);

        return chromas[0][0].fullRender
    }

  return (
    <div>
        <h3>{skin.displayName}</h3>
        <img src={getDisplayIcon(skin)} alt={skin.displayName}></img>
    </div>
  )
}
