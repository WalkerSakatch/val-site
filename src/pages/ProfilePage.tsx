import React from 'react'
import { useEffect, useState } from 'react';
import { db } from '../cache/IDBManager';
import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import { Map } from '@mrbabalafe/valorant-api-helper';
import { getPlayerInfo, getPlayerLoadout } from '@mrbabalafe/valorant-api-helper';
import { PlayerInfoResponse } from '@mrbabalafe/valorant-api-helper/build/api/auth/definitions/PlayerInfoResponse';
import axios, { AxiosRequestConfig } from 'axios';
import { PlayerLoadoutResponse } from '@mrbabalafe/valorant-api-helper/build/api/pvp/definitions/PlayerLoadoutResponse';
import { PlayerLoadoutGun } from '@mrbabalafe/valorant-api-helper/build/api/pvp/definitions/PlayerLoadoutGun';
import WeaponDisplay from '../components/WeaponDisplay';
import SimpleSkinDisplay from '../components/SimpleSkinDisplay';
import ProfileWeaponDisplay from '../components/ProfileWeaponDisplay';


export default function ProfilePage() {

    const [puuid, setPuuid] = useState('')
    const [loadout, setLoadout] = useState<PlayerLoadoutResponse>()
    const [playerInfo, setPlayerInfo] = useState<PlayerInfoResponse>()

    useEffect(() => {
        const tokenInfo = JSON.parse(sessionStorage.getItem('tokenInfo')!);
        const access_token = tokenInfo.access_token
        // setPuuid(getPlayerInfo(access_token));
        const config: AxiosRequestConfig = {
            headers: {'access_token': access_token}
        }
        let playerInfo = axios.get(`${process.env.REACT_APP_BASE_URL}/player/info`, config)
            .then((res) => {
                setPuuid(res.data.sub);
                setPlayerInfo(res.data);
            });
        console.log("playerInfo", playerInfo)
    }, [])

    useEffect(() => {
        if(puuid.length > 0) {
            const tokenInfo = JSON.parse(sessionStorage.getItem('tokenInfo')!);
            const access_token = tokenInfo.access_token;
            const entitlements_token = sessionStorage.getItem('entitlements_token')!;
            const shard = sessionStorage.getItem('shard')!;
            const config: AxiosRequestConfig = {
                headers: {
                    'access_token': access_token,
                    'entitlements_token': entitlements_token,
                    'shard': shard,
                    'puuid': puuid
                }
            }
            axios.get(`${process.env.REACT_APP_BASE_URL}/player/loadout`, config)
                .then((res) => {
                    setLoadout(res.data)
                });
        }
    }, [puuid])

    useEffect(() => {
        console.log("loadout", loadout)
        if(loadout !== undefined) {
            console.log("guns", loadout.Guns)
        }
    }, [loadout])

    return (
        <>
            <h1>{playerInfo?.acct.game_name}#{playerInfo?.acct.tag_line}</h1>
            <div className="weapons-page-grid">
                {loadout?.Guns.map(gun => (
                    <>
                        <ProfileWeaponDisplay {...gun}/>
                    </>
                ))
                }
            </div>
        </>
    )
}
