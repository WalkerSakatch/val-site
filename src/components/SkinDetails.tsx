import { Skin } from '@mrbabalafe/valorant-api-helper';
import { useLiveQuery } from 'dexie-react-hooks';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../cache/IDBManager';
import SimpleSkinDisplay from './SimpleSkinDisplay';
import SkinDisplay from './SkinDisplay';
import Helmet from 'react-helmet';

export default function SkinDetails() {

    const {weaponId, skinId} = useParams()
    const [skinIndex, setSkinIndex] = useState<number>();
    const [skin, setSkin] = useState<Skin>();
    const [loading, setLoading] = useState(true);
    
    //? Would be nice to store skins in a separate database, or store so I can look them up
    //? Instead of having to search through the array of skins like I am about to do
    const weaponData = useLiveQuery(() => {
        return db.weapons.where('uuid').equalsIgnoreCase(weaponId!).toArray();
    });

    useEffect(() => {
        if(weaponData !== undefined) {
            const skins = weaponData[0].skins;
            let index = skins.findIndex(skin => skin.uuid === skinId)
            setSkinIndex(index);

        }
    }, [weaponData])

    useEffect(() => {
        if(weaponData !== undefined && skinIndex !== undefined) {
            setSkin(weaponData[0].skins[skinIndex]);
            setLoading(false);
        }
    }, [skinIndex])
    

    return (
        <>
            <Helmet>
                <meta property="og:description" content={skin?.displayName} />
            </Helmet>
            {/* <h1>SKIN DETAILS</h1> */}
            {loading
                ? <h3>Loading...</h3>
                : <SkinDisplay {...skin!}/>
            }
        </>
    )
}
