import CustomMarkerIcon from '../images/CustomMarker.png'
import MyLocationMarker from '../images/MyLocationMarker.png'
import SelectedMarker from '../images/SelectedMarker.png'
import L from "leaflet"

export const cameraMarkerIcon = new L.Icon({
    iconUrl: CustomMarkerIcon,
    iconSize:[28,40.5],
    iconAnchor:[15,40],
    popupAnchor:[0,-47]
})

export const myLocationMarkerIcon = new L.Icon({
    iconUrl: MyLocationMarker,
    iconSize:[28,40.5],
    iconAnchor:[15,40],
    popupAnchor:[0,-47]
})

export const pickedLocationMarkerIcon = new L.Icon({
    iconUrl: SelectedMarker,
    iconSize:[28,40.5],
    iconAnchor:[15,40],
    popupAnchor:[0,-47]
})
