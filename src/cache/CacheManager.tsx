import { Version } from '@mrbabalafe/valorant-api-helper';
import { LocalStorageVersion } from './definitions/LocalStorageVersion';
import axios from 'axios';
import React, { useEffect } from 'react';
import { db } from './IDBManager';


//! Right now if IDB is deleted, but Local Storage is not, site will not display anything
//! Workaround currently is to delete Local Storage to force update everything.
export default function CacheManager() {
    let upToDate = versionIsCurrent();

    useEffect(() => {
        //CACHING DATA
        if(!upToDate) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/version`)
            .then((res) => {
                if (res.status === 200) {
                    updateVersion(res.data);
                    populateIDB();
                }
            });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function versionIsCurrent(): boolean {
        //If version not in Local Storage, version is not current
        let storageVersion = localStorage.getItem('version');
        if(!storageVersion) {
            return false;
        }
        
        //If current time is after the cached version's expiry, version is not current
        let sv: LocalStorageVersion = JSON.parse(storageVersion);
        if(Date.parse(sv.expiry) < Date.now()) {
            return false;
        }

        return true;
    }

    function updateVersion(version: Version): void {
        let expiry = new Date();
        expiry.setDate(expiry.getDate() + 1);

        let newVersionObj = {version, expiry}
        localStorage.setItem('version', JSON.stringify(newVersionObj));
    }

    function populateIDB() {
        db.populateWeapons();
        db.populateMaps();
    }
    
    return <></>
}
