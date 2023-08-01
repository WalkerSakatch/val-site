import { Agent, Ability } from '@mrbabalafe/valorant-api-helper';
import { useLiveQuery } from 'dexie-react-hooks';
import React from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../cache/IDBManager';
import '../styles/AgentsPage.css';

export default function AgentDetails() {

    const {agentId} = useParams();
    
    const agentData = useLiveQuery(() => {
        return db.agents.where('uuid').equalsIgnoreCase(agentId!).toArray();
    });

    return (
            <>
            {
            agentData?.map((agent: Agent) => (
                <>
                    <h1>{agent.displayName} ({agent.developerName}) - {agent.role.displayName}</h1>
                    <h2>{agent.description}</h2>
                    <img src={agent.fullPortraitV2} alt={agent.displayName}></img>
                    <h2>{agent.abilities[0].displayName}</h2>
                    {agent.abilities.map((ability: Ability) => (
                        <>
                            <h1>{ability.displayName}</h1>
                            <img src={ability.displayIcon} alt={ability.displayName}></img>
                            <h3>{ability.description}</h3>
                        </>
                    ))}
                </>
            ))
            }
            </>

    )
}
