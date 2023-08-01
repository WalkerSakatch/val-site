import React from 'react';
import { Agent } from "@mrbabalafe/valorant-api-helper";
import '../styles/AgentsPage.css';

export default function AgentDisplay(agent: Agent) {
    return (
      <div className='agent-display'>
            <h3 className='agent-display-name'>{agent.displayName}</h3>
            <img src={agent.displayIcon} alt={agent.displayName}></img>
      </div>
    )
}