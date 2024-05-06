import { Agent, Ability } from "@mrbabalafe/valorant-api-helper";
import "../styles/AbilityDetails.css";

import React from "react";

export default function AbilityDetails(props: { ability: Ability }) {
	return (
		<div className="ability_container">
			<h1>{props.ability.displayName}</h1>
			<img
				src={props.ability.displayIcon}
				alt={props.ability.displayName}
			></img>
			<h3>{props.ability.description}</h3>
		</div>
	);
}
