import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import { Marker, Popup } from 'react-leaflet';
import { pickedLocationMarkerIcon } from '../Dashboard/components/SearchCameras/markers/icons';
import useFetchCoordinatesFromURL from './hooks/useFetchCoordinatesFromURL';
import { ZOOM_LEVEL } from '../constants';
import { LeafletMap } from '../utils/utils';

const styles ={
    container:{
        width:"100%",
        height:"calc( 100vh )",
        background:"#141414",
    },
    mapContainer:{
        height:"100%",
        width:"100%",
        "& .leaflet-container":{
            height:"100%",
        }
    },
}

function Map() {

    const mapRef= useRef();
    const [coordinates,setCoordinates] = useState({lat:"",lng:""});
    useFetchCoordinatesFromURL({setCoordinates});

  return (
    <Grid sx={styles.container}>
    <Box sx={styles.mapContainer}>
    {
        (coordinates.lat.length>0 && coordinates.lng.length>0) ?
        <LeafletMap center={coordinates} zoomLevel={ZOOM_LEVEL} mapRef={mapRef}>
            <Marker position={[coordinates.lat,coordinates.lng]} icon={pickedLocationMarkerIcon}>
                <Popup>
                    <Typography fontFamily={"Mulish"} fontSize={"16px"} color={"error"}>
                        Selected Location
                    </Typography>
                </Popup>
            </Marker>
        </LeafletMap> :
        <Grid width={"100vw"} height={"100vh"}>
            <LinearProgress />
        </Grid>
    }
    </Box>
    </Grid>
  )
}

export default Map