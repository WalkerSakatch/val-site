import React from 'react'
import { db } from '../cache/IDBManager';
import { useLiveQuery } from 'dexie-react-hooks';
import { Link } from 'react-router-dom';
import { Map } from '@mrbabalafe/valorant-api-helper';

export default function MapsPage() {

  const mapData = useLiveQuery(() => {
      return db.maps.toArray();
  });

  return (
    <div>
        <h1>Maps</h1>
        <div className='maps-page-grid'>
            {mapData?.map((map: Map) => (
                <Link to={`/valorant/maps/${map.uuid}`}>
                    <img src={map.listViewIcon} alt={map.displayName}></img>
                </Link>
            ))}
        </div>
    </div>
  )
}
