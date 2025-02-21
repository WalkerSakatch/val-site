import React from 'react'
import { db } from '../cache/IDBManager';
import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import { Agent } from '@mrbabalafe/valorant-api-helper';
import '../styles/AgentsPage.css';
import AgentDisplay from '../components/AgentDisplay';
import { AgentWithUrlName } from '../types/AgentWithUrlName';

export default function AgentsPage() {

    const agentData = useLiveQuery(() => {
        return db.agents.toArray();
    });

    return (
      <div>
          <h1>Agents</h1>
          <div className='agents-page-grid'>
                {/* //?Local Compare sorts alphabetically i guess */}
                {agentData?.sort((a,b) => a.data.displayName.localeCompare(b.data.displayName)).map((agent: AgentWithUrlName) => (
                    //? Only render if isPlayableCharacter is true, because for some fucking reason there are 2 Sovas.
                    //? And also for some fucking reason you cannot filter in dexie by booleans so gotta conditionally render
                    // <>
                    //     {agent.isPlayableCharacter
                    //         ? <Link to={`/valorant/agents/${agent.uuid}`}> 
                    //                 <AgentDisplay {...agent} key={agent.uuid} />
                    //           </Link>
                    //         : <></>
                    //     }
                    // </>
                    <Link to={`/valorant/agents/${agent.urlEncodedName}`}> 
                        <AgentDisplay {...agent.data} key={agent.data.uuid} />
                    </Link>
                ))}
            </div>
      </div> 
    )
}