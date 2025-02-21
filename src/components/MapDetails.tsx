import React from 'react'
import { useLiveQuery } from 'dexie-react-hooks';
import { Link, useParams } from 'react-router-dom'
import { db } from '../cache/IDBManager';
import { Map } from '@mrbabalafe/valorant-api-helper';
import { MapWithUrlName } from '../types/MapWithUrlName';

export default function MapDetails() {
    const {mapName} = useParams();
    const mapData = useLiveQuery(() => {
        return db.maps.where('urlEncodedName').equalsIgnoreCase(mapName!).toArray();
    });

    return (
        //!! WHY AM I USING ARRAY.MAP? THERE SHOULD ONLY BE ONE MAP HERE I AM JUST COPYING WEAPONS PAGE.
        //! IT WORKS BUT IT LOOKS SO STUPID
        <div className="maps-page-grid">
            {
            mapData?.map((map: MapWithUrlName) => (
                <>
                    {/* //? How do I get the size of the image???  */}
                        {/* <svg>
                            <image href={map.displayIcon} height="8096" width="8096" />
                            <text x='0' y='1' fill='red'>{map.callouts[5].superRegionName + ' ' + map.callouts[5].regionName}</text>
                        </svg> */}
                    <span>
                        <img id='map-overhead-view' src={map.data.displayIcon} alt={map.data.displayName}></img>
                    </span>
                </>
            ))
            }
        </div>
    )
}
