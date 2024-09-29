import { Marker, Popup } from "react-leaflet"
import useFetchOwnerDetails from "../hooks/useFetchOwnerDetails"
import { CircularProgress, Typography } from "@mui/material";


const CustomPopup = ({ownerId})=>{

    const {
        loading,
        error,
        ownerDets,
    } = useFetchOwnerDetails(ownerId);

    return (
        <Popup>
        {
            loading ? <CircularProgress /> : error.length>0 ?
                <Typography fontFamily={"Mulish"} fontSize={"16px"} color={"error"}>
                    {error}
                </Typography> :
                <Typography fontFamily={"Mulish"} fontSize={"16px"}>
                {ownerDets?.name} <br/>
                {ownerDets?.address} <br/>
                {ownerDets?.phone}

                </Typography>
        }
        </Popup>
    )
}

export const CustomMarker = ({markerCoords,icon,ownerId})=>{
    return (
    <Marker 
        position={[markerCoords.lat,markerCoords.lng]}
        icon={icon}
    >
        <CustomPopup ownerId={ownerId} />
    </Marker>
    )
}

export const ClickedPositionMarker = ({markerCoords,icon,name})=>{
    return (
        <Marker 
            position={[markerCoords.lat,markerCoords.lng]}
            icon={icon}
        >
            <Popup>
                <Typography fontFamily={"Mulish"} fontSize={"16px"} color={"error"}>
                    {name}
                </Typography>
            </Popup>
        </Marker>
        )
}