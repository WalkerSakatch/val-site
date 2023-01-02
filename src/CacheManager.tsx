import { Version, WeaponResponse } from '@mrbabalafe/valorant-api-helper';
import { LocalStorageVersion } from './LocalStorageVersion';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import IDBManager from './IDBManager';
import { db } from './cache/IDB';

export default function CacheManager() {
    const [versionData, setVersionData] = useState<Version>();
    let upToDate = versionIsCurrent();

    useEffect(() => {
        //VERSION LOCAL STORAGE STUFF
        if(!upToDate) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/version`)
            .then((res) => {
                if (res.status === 200) {
                    setVersionData(res.data);
                    updateVersion(res.data);
                    populateIDB();
                }
            });
        }
    }, []);

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
    }

    // return <IDBManager versionWasUpdated={!upToDate}/>;
    return <></>
}
