import { devNull } from 'os';
import React, { useEffect } from 'react'

export default function IDBManager() {
  
    

    useEffect(() => {
        openDB();
    }, []);
    

    function openDB(): void {
        let db = null;
        let objectStore = null;
        const openRequest = indexedDB.open("weapons", 1);

        openRequest.onerror = (e: any) => {
            console.log('error', e.target.error);
        };

        openRequest.onsuccess = (e: any) => {
            db = e.target.result;
            console.log('success', db);

        };

        openRequest.onupgradeneeded = (e:any) => {
            let result = e.target.result;
            console.log('upgrade needed', result)
            if(!result.objectStoreNames.contains('weapons')) {
                objectStore = result.createObjectStore('weapons', {
                    keyPath: 'uuid'
                });
            }
        };

    }


    return (
        <div>IDBManager</div>
    )
}
