import React from 'react'
import { useEffect } from 'react';
import { Skin } from "@mrbabalafe/valorant-api-helper"

export default function SkinDisplay(skin: Skin) {

    useEffect(() => {
        getDisplayIcon(skin)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

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