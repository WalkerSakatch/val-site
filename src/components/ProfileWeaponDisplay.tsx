import { Skin, Weapon } from '@mrbabalafe/valorant-api-helper';
import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../cache/IDBManager';
import SimpleSkinDisplay from './SimpleSkinDisplay';
import SkinDisplay from './SkinDisplay';
import '../styles/WeaponsPage.css';
import { PlayerLoadoutGun } from '@mrbabalafe/valorant-api-helper/build/api/pvp/definitions/PlayerLoadoutGun';

export default function ProfileWeaponDisplay(gun: PlayerLoadoutGun) {
    
    const weaponData = useLiveQuery(() => {
        return db.weapons.where('uuid').equalsIgnoreCase(gun.ID).toArray();
    });

    return (
            <div className='weapon-display'>
                    {
                    weaponData?.map((weapon: Weapon) => (
                        <>
                            {
                            weapon.skins.map((skin: Skin) => (
                                <>
                                    {skin.uuid === gun.SkinID 
                                    ? <SimpleSkinDisplay {...skin} /> 
                                    : <></>}
                                </>
                            ))
                            }
                        </>
                    ))
                    }
            </div>
    )
}
