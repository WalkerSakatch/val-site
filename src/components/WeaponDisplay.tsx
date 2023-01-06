import React from 'react';
import { Link } from 'react-router-dom';
import {Skin, Weapon} from "@mrbabalafe/valorant-api-helper";
import SkinDisplay from './SkinDisplay';
import SimpleSkinDisplay from './SimpleSkinDisplay';

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
          <h1>WEAPON DISPLAY</h1>
          <h1>{weapon.displayName}</h1>
          <SimpleSkinDisplay {...defaultSkin} />
      </div>
    )
}