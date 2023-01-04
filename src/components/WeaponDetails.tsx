import { Skin, Weapon } from '@mrbabalafe/valorant-api-helper';
import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../cache/IDBManager';
import SimpleSkinDisplay from './SimpleSkinDisplay';
import SkinDisplay from './SkinDisplay';

export default function WeaponDetails() {

    const {weaponId} = useParams()
    
    const weaponData = useLiveQuery(() => {
        return db.weapons.where('uuid').equalsIgnoreCase(weaponId!).toArray();
    });

    return (
        <div>
            <h1>WEAPON DETAILS</h1>
            {
                weaponData?.map((weapon: Weapon) => (
                    weapon.skins.map((skin: Skin) => (
                        <Link to={`/valorant/weapons/${weapon.uuid}/skin/${skin.uuid}`}>
                            <SimpleSkinDisplay {...skin}/>
                        </Link>
                    ))
                ))
            }
        </div>
    )
}
