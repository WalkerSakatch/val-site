import { Agent, Ability } from "@mrbabalafe/valorant-api-helper";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../cache/IDBManager";
import AbilityDetails from "./AbilityDetails";
import "../styles/AgentsPage.css";
import { AgentWithUrlName } from "../types/AgentWithUrlName";

export default function AgentDetails() {
    
    const {agentName} = useParams();
	const agentData = useLiveQuery(() => {
		return db.agents.where("urlEncodedName").equalsIgnoreCase(agentName!).toArray();
	});

	return (
		<>
			{agentData?.map((agent: AgentWithUrlName) => (
				<>
					<h1>
						{agent.data.displayName} ({agent.data.developerName}) - {agent.data.role.displayName}
					</h1>
					<h2>{agent.data.description}</h2>

					<div className="agent-details-img">
						<img src={agent.data.fullPortraitV2} alt={agent.data.displayName}></img>
					</div>

					<div className="ability-display-box">
						{agent.data.abilities.map((ability: Ability) => (
							<AbilityDetails ability={ability}></AbilityDetails>
						))}
					</div>
				</>
			))}
		</>
	);
}
