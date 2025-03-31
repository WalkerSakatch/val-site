import Dexie, { Table } from "dexie";
import { getMaps, getWeapons, getAgents, Map, Weapon, Agent, Skin } from "@mrbabalafe/valorant-api-helper";
import { AgentWithUrlName } from "../types/AgentWithUrlName";
import { MapWithUrlName } from "../types/MapWithUrlName";
import { WeaponWithUrlName } from "../types/WeaponWithUrlName";
import { SkinWithUrlName } from "../types/SkinWithUrlName";

export class IDBManager extends Dexie {

    weapons!: Table<WeaponWithUrlName>;
    maps!: Table<MapWithUrlName>;
    agents!: Table<AgentWithUrlName>;

    constructor() {
        super('bmbl-db');
        //Version gets multiplied by 10 for some reason, so this is actually v1
        this.version(0.2).stores({
            'weapons': 'data.uuid, data.displayName, data.category, data.defaultSkinUuid, data.displayIcon, data.killStreamIcon, data.assetPath, data.weaponStats, data.shopData, data.skins, urlEncodedName, urlEncodedSkins',
            'maps': 'data.uuid, data.displayName, data.coordinates, data.displayIcon, data.listViewIcon, data.splash, data.assetPath, data.mapUrl, data.xMultiplier, data.yMultiplier, data.xScalarToAdd, data.yScalarToAdd, data.callouts, urlEncodedName',
            'agents': 'data.uuid, data.displayName, data.data.description, data.developerName, data.characterTags, data.displayIcon, data.displayIconSmall, data.bustPortrait, data.fullPortrait, data.fullPortraitV2, data.killfeedPortrait, data.background, data.backgroundGradientColors, data.assetPath, data.isFullPortraitRightFacing, data.isPlayableCharacter, data.isAvailableForTest, data.isBaseContent, data.role, data.abilities, data.voiceLine, urlEncodedName'
        });
    }

    async populateWeapons() {
        let weapons = (await getWeapons()).data;
        let weaponsWithUrlNames = this.makeWeaponWithUrlNameArray(weapons);
        //If Cannot bulk put to db, try putting one at a time.
        try {
            this.weapons.bulkPut(weaponsWithUrlNames);
            // console.log("Added to weapon db", weapons)
        } catch {
            console.log("Could not add to weapon db", weaponsWithUrlNames);
            weaponsWithUrlNames.forEach(weapon => {
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
        let mapsWithUrlNames = this.makeMapWithUrlNameArray(maps);
         //If Cannot bulk put to db, try putting one at a time.
        try {
            this.maps.bulkPut(mapsWithUrlNames);
            // console.log("Added to map db", maps);
        } catch {
            console.log("Could not add to map db", maps);
            mapsWithUrlNames.forEach(map => {
                try {
                    this.maps.put(map);
                    // console.log("Added to map db", map);
                } catch {
                    console.log("Could not add to map db", map)
                }
            });
        }
    }

    async populateAgents() {
        let agents = (await getAgents()).data;
        let agentsWithUrlNames = this.makeAgentWithUrlNameArray(agents);
        // console.log("agents", agents)
        // console.log("new agents", agentsWithUrlNames)
         //If Cannot bulk put to db, try putting one at a time.
        try {
            this.agents.bulkPut(agentsWithUrlNames);
            // console.log("Added to agent db", agents);
        } catch {
            console.log("Could not add to agent db", agents);
            agentsWithUrlNames.forEach(agent => {
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

    cleanseNameForUrl(name: string): string {
        return name.replace(/[\/<>\?'":]/g, '').replace(/\s+/g, '-').toLowerCase();
    }

    makeAgentWithUrlNameArray(agents: Agent[]): AgentWithUrlName[] {
        let agentsWithUrlNames = agents.map(agent => {
            let newObj: AgentWithUrlName = { data: agent, urlEncodedName : this.cleanseNameForUrl(agent.displayName)}
            return newObj;
        });
        return agentsWithUrlNames;
    }

    makeMapWithUrlNameArray(maps: Map[]): MapWithUrlName[] {
        let mapsWithUrlNames = maps.map(map => {
            let newObj: MapWithUrlName = { data: map, urlEncodedName : this.cleanseNameForUrl(map.displayName)}
            return newObj;
        });
        return mapsWithUrlNames; 
    }

    makeWeaponWithUrlNameArray(weapons: Weapon[]): WeaponWithUrlName[] {
        let weaponsWithUrlNames = weapons.map(weapon => {
            let newObj: WeaponWithUrlName = { data: weapon, urlEncodedName: this.cleanseNameForUrl(weapon.displayName), urlEncodedSkins: this.makeSkinWithUrlNameArray(weapon.skins)}
            return newObj;
        });
        return weaponsWithUrlNames;
    }

    makeSkinWithUrlNameArray(skins: Skin[]): SkinWithUrlName[] {
        let skisWithUrlNames = skins.map(skin => {
            let newObj: SkinWithUrlName = { data : skin, urlEncodedName: this.cleanseNameForUrl(skin.displayName)}
            return newObj;
        })
        return skisWithUrlNames;
    }
}

export const db = new IDBManager();