import React from 'react'
import { useEffect, useState } from 'react';
import { Chroma, Skin } from "@mrbabalafe/valorant-api-helper"
import '../styles/WeaponsPage.css';
import '../styles/SkinsPage.css';

export default function SkinDisplay(skin: Skin) {

    const [selectedChroma, setSelectedChroma] = useState(0);

    useEffect(() => {
        // console.log(skin.levels.length)
        getDisplayIcon(skin);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function getDisplayIcon(skin: Skin): string {
        return skin.chromas[selectedChroma].fullRender;
    }

  return (
    <>
    <div className='skins-page-grid'>
        {/* {console.log(skin.levels.length)} */}
        <div className='skin-display'>
          <img src={getDisplayIcon(skin)} alt={skin.displayName}></img>
          
        </div>
        <div className='chroma-selector'>
          {skin.chromas.map((chroma, index) => (
            <>
              <img src={chroma.swatch} alt={chroma.displayName} onClick={() => setSelectedChroma(index)}></img>
            </>
          ))
          }
        </div>
         {/* <h3>Levels:</h3> */}
         {/* {THERE IS ALWAYS 1 LEVEL CHECK F THE STREAMED VIDEO IS THERE} */}
         {/* {skin.levels.map(level => (
             <video controls={true}>
               <source src={level.streamedVideo}/>  
             </video>
        ))} */}
    </div>
    {skin.chromas[selectedChroma].streamedVideo !== null
          ? <>
              <div className="video-display">
                <h3 className='video-level-name'>{skin.chromas[selectedChroma].displayName}</h3>
                <video className='skin-level-video' key={skin.chromas[selectedChroma].streamedVideo} controls={true}>
                  <source src={skin.chromas[selectedChroma].streamedVideo}/>
                </video>
              </div> 
            </>
          : <></>
    }

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
    </>
  )
}