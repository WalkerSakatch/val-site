import React from 'react';
import { Weapon } from "@mrbabalafe/valorant-api-helper";
import WeaponDisplay from './WeaponDisplay';
import { db } from '../cache/IDBManager';
import { useLiveQuery } from 'dexie-react-hooks';

export default function WeaponsSection() {

    //This is from Dexie. Returns weapon db in IDB as array.
    const weaponData = useLiveQuery(() => {
        return db.weapons.toArray()
    });

    return (
    
        <div>
            {weaponData?.map((weapon: Weapon) => (
                <WeaponDisplay {...weapon} />
            ))}
        </div>
    )
}