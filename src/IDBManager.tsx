import { devNull } from 'os';
import React, { useEffect } from 'react'

export default function IDBManager() {
  
    

    useEffect(() => {
        openDB();
    }, []);
    

    function openDB(): void {
        const openRequest = indexedDB.open("weapons", 1);

        openRequest.onerror = (e) => {
            let target = e.target as IDBOpenDBRequest;
            console.log('error', target.result);
        };

        openRequest.onsuccess = (e) => {
            let target = e.target as IDBOpenDBRequest;
            let result = target.result;
            console.log('success', result);
        };

        openRequest.onupgradeneeded = (e) => {
            let target = e.target as IDBOpenDBRequest;
            let result = target.result;
            console.log('upgrade needed', result)
            if(!result.objectStoreNames.contains('weapons')) {
                result.createObjectStore('weapons', {
                    keyPath: 'uuid'
                });
            }
        };

    }


    return (
        <div>IDBManager</div>
    )
}
