import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { AuthorizationResponse } from '@mrbabalafe/valorant-api-helper/build/api/auth/definitions/AuthorizationResponse';
import { getEntitlementsToken, getTokenResponseFromUri } from '@mrbabalafe/valorant-api-helper';
import { AccessTokenResponse } from '@mrbabalafe/valorant-api-helper/build/api/auth/definitions/AccessTokenResponse';

export default function HomePage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [riotCode, setRiotCode] = useState('');

    async function handleLogin() {
        console.log("username", username);
        console.log("password", password);
        let lsVersion = JSON.parse(localStorage.getItem("version")!)
        let riotClientBuild = lsVersion.riotClientBuild;
        let body = {riotClientBuild, username, password}
        let loginResponse: AuthorizationResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, body)
            .then(res => {
                return res.data;
            });
        
        console.log("Login Response", loginResponse.data)
        
        //! Check for error
        if(loginResponse.data.error) {
            return;
        }

        //! Check for multifactor
        if(loginResponse.data.type === 'multifactor') {
            let cookies = loginResponse.cookies;
            let code = prompt(`CHECK ${loginResponse.data.multifactor.email} FOR A RIOT CODE:`);
            let mfaBody = {code, riotClientBuild, cookies}
            let mfaResponse: AuthorizationResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login2fa`, mfaBody)
                .then(res => {
                    console.log(res)
                    return res.data;
                });
            
            console.log("MFA Response", mfaResponse)
            if(mfaResponse.data.error) {
                return;
            }
            let tokenInfo = getTokenResponseFromUri(mfaResponse.data.response.parameters.uri);
            sessionStorage.setItem('tokenInfo', JSON.stringify(tokenInfo));
        }

        //! Otherwise should be good?
        if(loginResponse.data.type === 'response') {
            let tokenInfo = getTokenResponseFromUri(loginResponse.data.response.parameters.uri);
            sessionStorage.setItem('tokenInfo', JSON.stringify(tokenInfo));
        }

        let tokenInfo: AccessTokenResponse = JSON.parse(sessionStorage.getItem("tokenInfo")!);
        let access_token = tokenInfo.access_token;
        let entitlementsBody = {access_token}
        let entitlementsResponse: AuthorizationResponse = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/entitlements`, entitlementsBody)
            .then(res => {
                return res.data;
            });
        
        sessionStorage.setItem('entitlements_token', entitlementsResponse.data.entitlements_token);
        console.log("Entitlements Response", entitlementsResponse.data)
        
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