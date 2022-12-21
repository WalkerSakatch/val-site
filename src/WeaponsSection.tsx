import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Weapon, WeaponResponse} from "@mrbabalafe/valorant-api-helper"
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
            {weaponData?.data.map((weapon: Weapon) => (
                <WeaponDisplay {...weapon} />
            ))}
        </div>
        
    )
}
