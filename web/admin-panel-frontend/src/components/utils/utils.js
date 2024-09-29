import { MapContainer, TileLayer } from 'react-leaflet';
import { osmProvider } from '../constants';


export const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};

export const calculateDistance = (coord1, coord2) => {
    const R = 6371; // Earth radius in kilometers
    const dLat = deg2rad(coord2.lat - coord1.lat);
    const dLng = deg2rad(coord2.lng - coord1.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(coord1.lat)) *
        Math.cos(deg2rad(coord2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
};

export const LeafletMap = ({
    center,
    zoomLevel,
    mapRef,
    children
})=>{

    return (
    <MapContainer
        center={center}
        zoom={zoomLevel}
        ref={mapRef}
    >
        <TileLayer
            url={osmProvider.maptiler.url}
            attribution={osmProvider.maptiler.attribution}
        />
        { children }
    </MapContainer>
    )

}

export const renderInMap = (lat,lng) => {
    const urlSearchParams = new URLSearchParams({lat,lng})
    window.open("/map?"+urlSearchParams.toString(), '_blank');
  };