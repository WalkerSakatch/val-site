import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Weapon, WeaponResponse} from "@mrbabalafe/valorant-api-helper"
import WeaponDisplay from './WeaponDisplay'
// import IDBManager from './IDBManager'
import { db } from './cache/IDB'
import { useLiveQuery } from 'dexie-react-hooks'

export default function WeaponsSection() {

    //? This is from Dexie. Returns weapon db in IDB as array.
    const weaponData = useLiveQuery(() => {
        return db.weapons.toArray()
    });

    useEffect(() => {
        // db.populateWeapons();
    }, []);

    return (
    
        <div>
            {weaponData?.map((weapon: Weapon) => (
                <WeaponDisplay {...weapon} />
            ))}
        </div>
        
    )

}
