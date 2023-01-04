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
        <h3>Levels:</h3>
        {skin.levels.map(level => (
          <>
            {/* <h5>{level.assetPath}</h5>
            <h5>{level.displayIcon}</h5>
            <h5>{level.displayName}</h5>
            <h5>{level.levelItem}</h5>
            <h5>{level.streamedVideo}</h5> */}
            <video autoPlay={true} controls={true}>
              <source src={level.streamedVideo}/>  
            </video>
            {/* <h5>{level.uuid}</h5> */}
          </>
        ))}
    </div>
  )
}