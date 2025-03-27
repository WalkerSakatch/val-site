import React, { useEffect, useState } from 'react';
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

    const [firstColumn, setFirstColumn] = useState<Weapon[]>([])
    const [secondColumn, setSecondColumn] = useState<Weapon[]>([])
    const [thirdColumn, setThirdColumn] = useState<Weapon[]>([])
    const [fourthColumn, setFourthColumn] = useState<Weapon[]>([])
    const [fifthColumn, setFifthColumn] = useState<Weapon[]>([])


    useEffect(() => {
        if(weaponData === undefined) {
            return;
        }

        let tempWeaponData = weaponData.sort((a, b) => sortWeapons(a, b));
        console.log(tempWeaponData);
        setFirstColumn(weaponData.slice(0, 5).sort((a, b) => a.shopData.cost - b.shopData.cost));
        setSecondColumn((weaponData.slice(5, 7).sort((a, b) => a.shopData.cost - b.shopData.cost)).concat(weaponData.slice(7, 9).sort((a, b) => a.shopData.cost - b.shopData.cost)));
        setThirdColumn(weaponData.slice(9, 13).sort((a, b) => a.shopData.cost - b.shopData.cost).sort((a, b) => a.displayName.localeCompare(b.displayName)));
        setFourthColumn(weaponData.slice(13, 16).sort((a, b) => a.shopData.cost - b.shopData.cost).concat(weaponData.slice(16, 18).sort((a, b) => a.shopData.cost - b.shopData.cost)));
        setFifthColumn(weaponData.slice(18, 19).sort((a, b) => a.shopData.cost - b.shopData.cost));
        

        // setSortedSidearms(testy)
        // tempWeaponData.forEach(weapon => {
        //     console.log(`weapon: ${weapon.displayName}`);
        // })
    },[weaponData]);

    useEffect(() => {
        console.log("firstColumn", firstColumn)
        console.log("secondColumn", secondColumn)
        console.log("thirdColumn", thirdColumn)
        console.log("fourthColumn", fourthColumn)
        console.log("fifthColumn", fifthColumn)

    }, [firstColumn, secondColumn, thirdColumn, fourthColumn, fifthColumn]);

    function sortWeapons(a: Weapon, b: Weapon): number {
        //?Some weird ass function that takes the weapons and sorts
        let order = ["sidearm", "smg", "shotgun", "rifle", "sniper", "heavy", "melee"]        
        return order.indexOf(a.category.split('::')[1].toLocaleLowerCase()) - order.indexOf(b.category.split('::')[1].toLocaleLowerCase())
    }

    //{weaponData?.sort((a, b) => a.category.localeCompare(b.category)).map((weapon: Weapon) => (
    return (
        <div className="weapons-page-grid">
        {[firstColumn, secondColumn, thirdColumn, fourthColumn, fifthColumn].map((column, columnIndex) => (
            <div key={columnIndex} className="weapon-grid-column">
                {column.map((weapon) => (
                    <Link to={`/valorant/weapons/${weapon.uuid}`} >
                        <WeaponDisplay {...weapon} key={weapon.uuid}/>
                    </Link>
                ))}
            </div>
        ))}
    </div>
    )
}