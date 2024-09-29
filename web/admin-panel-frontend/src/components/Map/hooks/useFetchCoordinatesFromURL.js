import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const useFetchCoordinatesFromURL = ({
    setCoordinates,
}) => {

    const location = useLocation();
    const urlSearchParams = new URLSearchParams(location.search);

    useEffect(()=>{
        const lat = urlSearchParams.get("lat");
        const lng = urlSearchParams.get("lng");
        setCoordinates({
            lat,lng
        })
    },[])
}

export default useFetchCoordinatesFromURL