import React from 'react'
import { useEffect } from 'react';
import { Skin } from "@mrbabalafe/valorant-api-helper"
import '../styles/WeaponsPage.css';

export default function SimpleSkinDisplay(skin: Skin) {

    useEffect(() => {
        getDisplayIcon(skin)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getDisplayIcon(skin: Skin): string {
        return skin.chromas[0].fullRender;
    }

  return (
    <div>
        <h3 className='skin-display-name'>{skin.displayName}</h3>
        <img src={getDisplayIcon(skin)} alt={skin.displayName}></img>
    </div>
  )
}