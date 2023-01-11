import React from 'react'
import { useEffect } from 'react';
import { Skin } from "@mrbabalafe/valorant-api-helper"
import '../styles/WeaponsPage.css';
import '../styles/SkinsPage.css';

export default function SkinDisplay(skin: Skin) {

    useEffect(() => {
        // console.log(skin.levels.length)
        getDisplayIcon(skin)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getDisplayIcon(skin: Skin): string {
        return skin.chromas[0].fullRender;
    }

  return (
    <div className='skins-page-grid'>
        {/* {console.log(skin.levels.length)} */}
        <div className='skin-display'>

          <h3 className='skin-display-name'>{skin.displayName}</h3>
          <img src={getDisplayIcon(skin)} alt={skin.displayName}></img>
        </div>
        {skin.levels.length > 1
          ? <>
              {/* <h3>Levels</h3> */}
              {skin.levels.map(level => (
                <div className='video-display'>
                  <h3 className='video-level-name'>{level.displayName}</h3>
                  <video className='skin-level-video' controls={true}>
                    <source src={level.streamedVideo}/>
                  </video>
                </div>
              ))}
            </> 
          : <></>
        }
         {/* <h3>Levels:</h3> */}
         {/* {THERE IS ALWAYS 1 LEVEL CHECK F THE STREAMED VIDEO IS THERE} */}
         {/* {skin.levels.map(level => (
             <video controls={true}>
               <source src={level.streamedVideo}/>  
             </video>
        ))} */}
    </div>
  )
}