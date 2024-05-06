import { Agent, Ability } from "@mrbabalafe/valorant-api-helper";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../cache/IDBManager";
import AbilityDetails from "./AbilityDetails";
import "../styles/AgentsPage.css";

export default function AgentDetails() {
	const { agentId } = useParams();

	const agentData = useLiveQuery(() => {
		return db.agents.where("uuid").equalsIgnoreCase(agentId!).toArray();
	});

	return (
		<>
			{agentData?.map((agent: Agent) => (
				<>
					<h1>
						{agent.displayName} ({agent.developerName}) -{" "}
						{agent.role.displayName}
					</h1>
					<h2>{agent.description}</h2>

					<div style={{ display: "flex", flexDirection: "row" }}>
						<div className="agent-details-img">
							<img
								src={agent.fullPortraitV2}
								alt={agent.displayName}
							></img>
						</div>

						<div className="ability-display-box">
							{agent.abilities.map((ability: Ability) => (
								<AbilityDetails
									ability={ability}
								></AbilityDetails>
							))}
						</div>
					</div>
				</>
			))}
		</>
	);
}
