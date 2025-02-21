import React from 'react'
import { db } from '../cache/IDBManager';
import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import { Map } from '@mrbabalafe/valorant-api-helper';
import { MapWithUrlName } from '../types/MapWithUrlName';

export default function MapsPage() {

    const mapData = useLiveQuery(() => {
        return db.maps.toArray();
    });

    return (
        <div>
            <h1>Maps</h1>
            <div className='maps-page-grid'>
                {mapData?.map((map: MapWithUrlName) => (
                    <Link to={`/valorant/maps/${map.urlEncodedName}`}>
                        <img src={map.data.listViewIcon} alt={map.data.displayName}></img>
                    </Link>
                ))}
            </div>
        </div>
    )
}
