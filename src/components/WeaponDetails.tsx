import { Skin, Weapon } from '@mrbabalafe/valorant-api-helper';
import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../cache/IDBManager';
import SimpleSkinDisplay from './SimpleSkinDisplay';
import SkinDisplay from './SkinDisplay';
import '../styles/WeaponsPage.css';
import { WeaponWithUrlName } from '../types/WeaponWithUrlName';

export default function WeaponDetails() {

    const {weaponName} = useParams();
    
    const weaponData = useLiveQuery(() => {
        return db.weapons.where('urlEncodedName').equalsIgnoreCase(weaponName!).toArray();
    });

    return (
            <div className="weapons-page-grid">
            {
            weaponData?.map((weapon: WeaponWithUrlName) => (
                weapon.data.skins.map((skin: Skin, i: number) => (
                <Link to={`/valorant/weapons/${weapon.urlEncodedName}/skin/${weapon.urlEncodedSkins[i].urlEncodedName}`}>
                    <div className='weapon-display'>
                        <SimpleSkinDisplay {...skin}/>
                    </div>
                </Link>
                ))
            ))
            }
            </div>
    )
}
