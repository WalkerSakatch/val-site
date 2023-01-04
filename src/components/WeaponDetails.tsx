import { Skin, Weapon } from '@mrbabalafe/valorant-api-helper';
import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../cache/IDBManager';
import SkinDisplay from './SkinDisplay';

export default function WeaponDetails() {

    const {weaponId} = useParams()
    
    const weaponData = useLiveQuery(() => {
        return db.weapons.where('uuid').equalsIgnoreCase(weaponId!).toArray();
    });

    console.log(weaponData)

    return (
        <div>
            {
                weaponData?.map((weapon: Weapon) => (
                    weapon.skins.map((skin: Skin) => (
                        <SkinDisplay {...skin}/>
                    ))
                ))
            }
        </div>
    )
}
