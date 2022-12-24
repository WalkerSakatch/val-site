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
            console.log('sucess', e.target.result);
        };

        openRequest.onupgradeneeded = (e: any) => {
            console.log('upgrade needed', e.target.result)
        };

    }


    return (
        <div>IDBManager</div>
    )
}
