import React, { useEffect, useState } from 'react';
import {Skin, Weapon} from "@mrbabalafe/valorant-api-helper";
import SkinDisplay from './SkinDisplay';

export default function WeaponDisplay(weapon: Weapon) {
    let defaultSkinUUID = weapon.defaultSkinUuid;
    const defaultSkin = getDefaultSkin();

    function getDefaultSkin(): Skin {
        let retVal!: Skin;
        weapon.skins.forEach(skin => {
          if(skin.uuid === defaultSkinUUID) {
            retVal = skin;
          }
        })
        return retVal;
    }

    return (
      <div>
          <h1>{weapon.displayName}</h1>
              <SkinDisplay {...defaultSkin}/>
      </div>
    )
}