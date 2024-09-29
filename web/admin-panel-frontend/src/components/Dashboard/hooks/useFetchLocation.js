import React from 'react'
import { ZOOM_LEVEL } from '../../constants';

const useFetchLocation = ({
    fetchLocation,
    mapRef,
    location,
}) => {

    const handleLocationFetch = ()=>{
        fetchLocation();
        if(location.loaded){
            mapRef?.current?.flyTo(
                [location.coordinates.lat, location.coordinates.lng],
                ZOOM_LEVEL,
                { animate: true }
            );
        }
    }

  return {

  }
}

export default useFetchLocation