import React from 'react';
import { Weapon } from "@mrbabalafe/valorant-api-helper";
import WeaponDisplay from '../components/WeaponDisplay';
import { db } from '../cache/IDBManager';
import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import '../styles/WeaponsPage.css';

export default function WeaponsPage() {

    //This is from Dexie. Returns weapon db in IDB as array.
    const weaponData = useLiveQuery(() => {
        return db.weapons.toArray()
    });

    return (
        <main>
            <div className="weapons-page-grid">
                {weaponData?.map((weapon: Weapon) => (
                    <Link to={`/valorant/weapons/${weapon.uuid}`}>
                        <WeaponDisplay {...weapon} key={weapon.uuid} />
                    </Link>
                ))}
            </div>
        </main>
    )
}