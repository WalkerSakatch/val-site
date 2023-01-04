import Dexie, { Table } from "dexie";
import { getWeapons, Weapon } from "@mrbabalafe/valorant-api-helper";

export class IDBManager extends Dexie {

    weapons!: Table<Weapon>;

    constructor() {
        super('bmbl-db');
        //Version gets multiplied by 10 for some reason, so this is actually v1
        this.version(0.1).stores({
            'weapons': 'uuid, displayName, category, defaultSkinUuid, displayIcon, killStreamIcon, assetPath, weaponStats, shopData, skins'
        });
    }
    
    async populateWeapons() {
        let weapons = (await getWeapons()).data
        //If Cannot bulk put to db, try putting one at a time.
        try {
            this.weapons.bulkPut(weapons);
            // console.log("Added to weapon db", weapons)
        } catch {
            console.log("Could not add to weapon db", weapons)
            weapons.forEach(weapon => {
                try {
                    this.weapons.put(weapon)
                    // console.log("Added to weapon db", weapon);
                } catch {
                    console.log("Could not add to weapon db", weapon);
                }
            })
        }
    }
}

export const db = new IDBManager();