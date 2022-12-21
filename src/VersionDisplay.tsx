import React, { useEffect, useState } from 'react'
import axios from "axios"
import {Version} from "@mrbabalafe/valorant-api-helper"

export default function VersionDisplay() {

    const [versionData, setVersionData] = useState<Version>();

    // const data = axios.get('http://localhost:12347/version')
    // .then(res => {
    //   console.log(res)
    // });

  useEffect(() => {
    axios.get('http://localhost:12347/version')
    .then(res => {
    //   console.log(res.data)
        setVersionData(res.data)
    });
  }, []);


    return (
        <div>
            <h1>Version:</h1>
            <h3>Manifest ID: {versionData?.manifestId}</h3>
            <h3>Branch: {versionData?.branch}</h3>
            <h3>Version: {versionData?.version}</h3>
            <h3>Build Version: {versionData?.buildVersion}</h3>
            <h3>Engine Version: {versionData?.engineVersion}</h3>
            <h3>Riot Client Version: {versionData?.riotClientVersion}</h3>
            <h3>Riot Client Build: {versionData?.riotClientBuild}</h3>
            <h3>Build Date: {Date.parse(`${versionData?.buildDate}`)}</h3>
        </div>
        
    )
}
