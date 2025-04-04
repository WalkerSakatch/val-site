import { Skin } from '@mrbabalafe/valorant-api-helper';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../cache/IDBManager';
import SimpleSkinDisplay from './SimpleSkinDisplay';
import SkinDisplay from './SkinDisplay';

export default function SkinDetails() {

    const {weaponName, skinName} = useParams()
    const [skinIndex, setSkinIndex] = useState<number>();
    const [skin, setSkin] = useState<Skin>();
    const [loading, setLoading] = useState(true);
    
    //? Would be nice to store skins in a separate database, or store so I can look them up
    //? Instead of having to search through the array of skins like I am about to do
    const weaponData = useLiveQuery(() => {
        return db.weapons.where('urlEncodedName').equalsIgnoreCase(weaponName!).toArray();
    });

    useEffect(() => {
        if(weaponData !== undefined) {
            const skins = weaponData[0].urlEncodedSkins;
            let index = skins.findIndex(skin => skin.urlEncodedName === skinName)
            setSkinIndex(index);

        }
    }, [weaponData])

    useEffect(() => {
        if(weaponData !== undefined && skinIndex !== undefined) {
            setSkin(weaponData[0].data.skins[skinIndex]);
            setLoading(false);
        }
    }, [skinIndex])
    

    return (
        <>
            {/* <h1>SKIN DETAILS</h1> */}
            {loading
                ? <h3>Loading...</h3>
                : <SkinDisplay {...skin!}/>
            }
        </>
    )
}
