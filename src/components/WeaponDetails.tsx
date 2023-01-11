import { Skin, Weapon } from '@mrbabalafe/valorant-api-helper';
import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../cache/IDBManager';
import SimpleSkinDisplay from './SimpleSkinDisplay';
import SkinDisplay from './SkinDisplay';
import '../styles/WeaponsPage.css';

export default function WeaponDetails() {

    const {weaponId} = useParams()
    
    const weaponData = useLiveQuery(() => {
        return db.weapons.where('uuid').equalsIgnoreCase(weaponId!).toArray();
    });

    return (
        <main>
            <div className="weapons-page-grid">
            {
            weaponData?.map((weapon: Weapon) => (
                weapon.skins.map((skin: Skin) => (
                    <div className='weapon-display'>
                        <Link to={`/valorant/weapons/${weapon.uuid}/skin/${skin.uuid}`}>
                            <SimpleSkinDisplay {...skin}/>
                        </Link>
                    </div>
                ))
            ))
            }
            </div>
        </main>
    )
}
