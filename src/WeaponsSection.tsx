import React, { useEffect, useState } from 'react'
import axios from "axios"
import {WeaponResponse} from "../../valorant-api-helper/src/api/weapons/definitions/WeaponResponse"
import {Weapon} from "../../valorant-api-helper/src/api/weapons/definitions/Weapon"
import WeaponDisplay from './WeaponDisplay'

export default function WeaponsSection() {

    const [weaponData, setWeaponData] = useState<WeaponResponse>();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/weapons`)
        .then(res => {
            setWeaponData(res.data)
        });
    }, []);


    return (
        <div>
            {weaponData?.data.map(weapon => (
                <WeaponDisplay {...weapon} />
            ))}
        </div>
        
    )
}
