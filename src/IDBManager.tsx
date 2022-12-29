import { getWeapons } from '@mrbabalafe/valorant-api-helper';
import React, { useEffect, useState } from 'react'

export default function IDBManager() {
  
    const [database, setDatabase] = useState<IDBDatabase>();

    useEffect(() => {
        openDB();
    }, []);

    useEffect(() => {
        if(database !== undefined) {
            storeWeaponData();
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

    //! Adding weapons to IDB works, however currently on page reload, if the idb exists the transaction and request onerror methods
    //! are triggered because this function is trying to add items with duplicate uuids (the weapon is already in IDB)
    //! I think that this should be resolved by checking in CacheManager if the version was updated, and if it was
    //! In this IDBManager I should clear the IDB and then call this function.
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
            let request = store.add(weapon);

            request.onerror = (e) => {
                console.log('Error adding weapon to objectStore: ', e);
            }

            request.onsuccess = (e) => {
                console.log('Added weapon to objectStore: ', weapon)
            }
        });
    }

    return (
        <div>IDBManager</div>
    )
}
