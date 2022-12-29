import { getWeapons } from '@mrbabalafe/valorant-api-helper';
import React, { useEffect, useState } from 'react'

export default function IDBManager({versionWasUpdated}: any) {
  
    const [database, setDatabase] = useState<IDBDatabase>();

    useEffect(() => {
        console.log('was version updated? ', versionWasUpdated)
        openDB();
    }, []);

    useEffect(() => {
        //! Issue: If IDB is deleted and Local Storage is not, weapons will not be saved in IDB
        //! Workaround: Delete Local Storage from Developer Tools -> Application -> Local Storage
        if(database !== undefined) {
            if(versionWasUpdated) {
                storeWeaponData();
            }
        }
    }, [database]);
    

    function openDB(): void {
        const openRequest = indexedDB.open("weapons", 1);

        openRequest.onerror = (e) => {
            let target = e.target as IDBOpenDBRequest;
            console.log('error', target.result);
        };

        openRequest.onsuccess = (e) => {
            let target = e.target as IDBOpenDBRequest;
            let result = target.result;
            setDatabase(result);
            console.log('success', result);
        };

        openRequest.onupgradeneeded = (e) => {
            let target = e.target as IDBOpenDBRequest;
            let result = target.result;
            setDatabase(result);
            console.log('upgrade needed', result)
            if(!result.objectStoreNames.contains('weapons')) {
                result.createObjectStore('weapons', {
                    keyPath: 'uuid'
                });
            }
        };

    }

    async function storeWeaponData() {
        let weapons = (await getWeapons()).data
        console.log(weapons)

        let transaction = database!.transaction('weapons', 'readwrite');
        console.log("transaction", transaction)

        transaction.onerror = (e) => {
            console.log('trans error', e.target);
        }

        transaction.oncomplete = (e) => {
            let target = e.target as IDBTransaction;
            console.log('trans on complete', target)
        }
        
        let store = transaction.objectStore('weapons');
        console.log('store', store);

        weapons.forEach(weapon => {
            let request = store.put(weapon);

            request.onerror = (e) => {
                console.log('Error adding weapon to objectStore: ', e);
            }

            request.onsuccess = (e) => {
                console.log('Added weapon to objectStore: ', weapon)
            }
        });
    }

    function clearIDB(): void {

    }

    return (
        <div>IDBManager</div>
    )
}
