import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { AuthorizationResponse } from '@mrbabalafe/valorant-api-helper/build/api/auth/definitions/AuthorizationResponse';
import { getTokenResponseFromUri, RegionToShard } from '@mrbabalafe/valorant-api-helper';
import { AccessTokenResponse } from '@mrbabalafe/valorant-api-helper/build/api/auth/definitions/AccessTokenResponse';
import { RegionResponse } from '@mrbabalafe/valorant-api-helper/build/api/auth/definitions/RegionResponse';

export default function HomePage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [riotCode, setRiotCode] = useState('');

    async function handleLogin() {
        const lsVersion = JSON.parse(localStorage.getItem("version")!);
        const riotClientBuild = lsVersion.version.riotClientBuild;
        const loginBody = { riotClientBuild, username, password }
        
        //? Make initial login request
        const loginResponse: AuthorizationResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, loginBody)
            .then(res => {
                return res.data;
            });
        
        //? Check for error
        if(loginResponse.data.error) {
            return;
        }

        //? Check for multifactor
        if(loginResponse.data.type === 'multifactor') {
            const cookies = loginResponse.cookies;
            const code = prompt(`CHECK ${loginResponse.data.multifactor.email} FOR A RIOT CODE:`);
            const mfaBody = {code, riotClientBuild, cookies}
            const mfaResponse: AuthorizationResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login2fa`, mfaBody)
                .then(res => {
                    return res.data;
                });
            
            if(mfaResponse.data.error) {
                return;
            }
            const tokenInfo = getTokenResponseFromUri(mfaResponse.data.response.parameters.uri);
            sessionStorage.setItem('tokenInfo', JSON.stringify(tokenInfo));
        }

        //? Otherwise should be good
        if(loginResponse.data.type === 'response') {
            const tokenInfo = getTokenResponseFromUri(loginResponse.data.response.parameters.uri);
            sessionStorage.setItem('tokenInfo', JSON.stringify(tokenInfo));
        }



        
        let tokenInfo: AccessTokenResponse = JSON.parse(sessionStorage.getItem("tokenInfo")!);
        let access_token = tokenInfo.access_token;
        let id_token = tokenInfo.id_token;
        let entitlementsBody = {access_token}
        let entitlementsResponse: AuthorizationResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/entitlements`, entitlementsBody)
            .then(res => {
                return res.data;
            });
        
        sessionStorage.setItem('entitlements_token', entitlementsResponse.data.entitlements_token);


        //! THIS IS ALL REGION STUFF BELOW. PROBABLY PUT INTO IT'S OWN FUNCTION
        let regionBody = {
            access_token,
            id_token
        }
        let regionResponse: RegionResponse = await axios.put(`${process.env.REACT_APP_BASE_URL}/auth/region`, regionBody)
            .then(res => {
                return res.data;
            });

        let shard = RegionToShard(regionResponse.data.affinities.live);
        sessionStorage.setItem('shard', shard);
    }

    return (
        <>
            <h1>LOGIN</h1>
            <div className="login-form">
                <div className="input-container">
                    <label>Username: </label>
                    <input type='text' onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div className="input-container">
                    <label>Password: </label>
                    <input type='password' onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="login-button">
                    <button onClick={handleLogin}>Log In</button>
                </div>
            </div>
        </>
    )
}