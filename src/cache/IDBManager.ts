import Dexie, { Table } from "dexie";
import { getMaps, getWeapons, getAgents, Map, Weapon, Agent } from "@mrbabalafe/valorant-api-helper";
import { AgentWithUrlName } from "../types/AgentWithUrlName";

export class IDBManager extends Dexie {

    weapons!: Table<Weapon>;
    maps!: Table<Map>;
    agents!: Table<AgentWithUrlName>;

    constructor() {
        super('bmbl-db');
        //Version gets multiplied by 10 for some reason, so this is actually v1
        this.version(0.1).stores({
            'weapons': 'uuid, displayName, category, defaultSkinUuid, displayIcon, killStreamIcon, assetPath, weaponStats, shopData, skins',
            'maps': 'uuid, displayName, coordinates, displayIcon, listViewIcon, splash, assetPath, mapUrl, xMultiplier, yMultiplier, xScalarToAdd, yScalarToAdd, callouts',
            'agents': 'data.uuid, data.displayName, data.data.description, data.developerName, data.characterTags, data.displayIcon, data.displayIconSmall, data.bustPortrait, data.fullPortrait, data.fullPortraitV2, data.killfeedPortrait, data.background, data.backgroundGradientColors, data.assetPath, data.isFullPortraitRightFacing, data.isPlayableCharacter, data.isAvailableForTest, data.isBaseContent, data.role, data.abilities, data.voiceLine, urlEncodedName'
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
}

export const db = new IDBManager();