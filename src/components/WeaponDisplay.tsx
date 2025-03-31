import React from 'react';
import { Link } from 'react-router-dom';
import {Skin, Weapon} from "@mrbabalafe/valorant-api-helper";
import SkinDisplay from './SkinDisplay';
import SimpleSkinDisplay from './SimpleSkinDisplay';
import '../styles/WeaponsPage.css';
import { WeaponWithUrlName } from '../types/WeaponWithUrlName';

export default function WeaponDisplay(weapon: WeaponWithUrlName) {
    let defaultSkinUUID = weapon.data.defaultSkinUuid;
    const defaultSkin = getDefaultSkin();

    function getDefaultSkin(): Skin {
        let retVal!: Skin;
        weapon.data.skins.forEach(skin => {
          if(skin.uuid === defaultSkinUUID) {
            retVal = skin;
          }
        })
        return retVal;
    }

    return (
      <div className='weapon-display'>
          {/* <h1>WEAPON DISPLAY</h1> */}
          {/* <h3 className='weapon-display-name'>{weapon.displayName}</h3> */}
          <SimpleSkinDisplay {...defaultSkin} />
      </div>
    )
}