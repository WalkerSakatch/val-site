import Dexie, { Table } from "dexie";
import { getMaps, getWeapons, getAgents, Map, Weapon, Agent } from "@mrbabalafe/valorant-api-helper";

export class IDBManager extends Dexie {

    weapons!: Table<Weapon>;
    maps!: Table<Map>;
    agents!: Table<Agent>;

    constructor() {
        super('bmbl-db');
        //Version gets multiplied by 10 for some reason, so this is actually v1
        this.version(0.1).stores({
            'weapons': 'uuid, displayName, category, defaultSkinUuid, displayIcon, killStreamIcon, assetPath, weaponStats, shopData, skins',
            'maps': 'uuid, displayName, coordinates, displayIcon, listViewIcon, splash, assetPath, mapUrl, xMultiplier, yMultiplier, xScalarToAdd, yScalarToAdd, callouts',
            'agents': 'uuid, displayName, description, developerName, characterTags, displayIcon, displayIconSmall, bustPortrait, fullPortrait, fullPortraitV2, killfeedPortrait, background, backgroundGradientColors, assetPath, isFullPortraitRightFacing, isPlayableCharacter, isAvailableForTest, isBaseContent, role, abilities, voiceLine'
        });
    }
    
    async populateWeapons() {
        let weapons = (await getWeapons()).data;
        //If Cannot bulk put to db, try putting one at a time.
        try {
            this.weapons.bulkPut(weapons);
            // console.log("Added to weapon db", weapons)
        } catch {
            console.log("Could not add to weapon db", weapons);
            weapons.forEach(weapon => {
                try {
                    this.weapons.put(weapon)
                    // console.log("Added to weapon db", weapon);
                } catch {
                    console.log("Could not add to weapon db", weapon);
                }
            });
        }
    }

    async populateMaps() {
        let maps = (await getMaps()).data;
         //If Cannot bulk put to db, try putting one at a time.
        try {
            this.maps.bulkPut(maps);
            // console.log("Added to map db", maps);
        } catch {
            console.log("Could not add to map db", maps);
            maps.forEach(map => {
                try {
                    this.maps.put(map);
                    console.log("Added to map db", map);
                } catch {
                    console.log("Could not add to map db", map)
                }
            });
        }
    }

    async populateAgents() {
        let agents = (await getAgents()).data;
        console.log("agents", agents)
         //If Cannot bulk put to db, try putting one at a time.
        try {
            this.agents.bulkPut(agents);
            console.log("Added to agent db", agents);
        } catch {
            console.log("Could not add to agent db", agents);
            agents.forEach(agent => {
                try {
                    this.agents.put(agent);
                    console.log("Added to agent db", agent);
                } catch(err) {
                    console.log("Could not add to agent db", agent)
                    console.error(err);
                }
            });
        }
    }
}

export const db = new IDBManager();