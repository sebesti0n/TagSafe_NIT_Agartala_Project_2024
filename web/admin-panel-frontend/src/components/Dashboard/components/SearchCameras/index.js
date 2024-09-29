import { Box, Button, Grid } from '@mui/material'
import { MapContainer, useMapEvents } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import "leaflet/dist/leaflet.css";
import useGeoLocation from '../../hooks/useGeoLocation';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import { MAP_CENTER, ZOOM_LEVEL, osmProvider } from '../../../constants';
import useFilters from '../../hooks/useFilters';
import useFetchLocation from '../../hooks/useFetchLocation';
import { LoadingScreen } from './components/Loading';
import { cameraMarkerIcon, myLocationMarkerIcon, pickedLocationMarkerIcon } from './markers/icons';
import useFetchCameras from './hooks/useFetchCameras';
import { ClickedPositionMarker, CustomMarker } from './markers';
import { FiltersDialog } from './components/FiltersDialog';

const styles = {
    container:{
        width:"100%",
        height:"calc( 100vh - 65px )",
        background:"#141414",
    },
    mapContainer:{
        height:"100%",
        width:"100%",
        "& .leaflet-container":{
            height:"100%",
        }
    },
    locateMeButton:{
        position:"absolute",
        right:"50px",
        bottom:"50px",
        zIndex:"1000",
        "& svg":{
            marginRight:"5px"
        }
    },
    filtersButton:{
        position:"absolute",
        right:"50px",
        bottom:"100px",
        zIndex:"1000",
        "& svg":{
            marginRight:"5px"
        }
    },
}

function AllCameras() {

    const mapRef = useRef();
    const [error,setError] = useState("");
    const [fetching,setFetching] = useState(false);
    const [camerasData,setCamerasData] = useState([]);
    const [markedPosition,setMarkedPosition] = useState({lat:"",lng:""});
    const [filteredData,setFilteredData] = useState([]);
    const [radius,setRadius] = useState(0);
    const [showFiltersDialog,setShowFilterDialog] = useState(false);

    //Custom Hooks
    const { location, fetchLocation } = useGeoLocation();
    const { setFilters } = useFilters({
        radius,
        setFilteredData,
        camerasData,
        setShowFilterDialog,
        markedPosition,
    });
    const { handleLocationFetch } = useFetchLocation({
        fetchLocation,
        mapRef,
        location,
    })
    useFetchCameras({
        setFetching,
        setCamerasData,
        setError
    });


    const handleFiltersButtonClick = ()=>{
        if(markedPosition.lat.length && markedPosition.lng.length){
            if(radius==0){
                setShowFilterDialog(true);
            }else{
                setRadius(0);
            }
        }else{
            alert("First select a location on the map, by clicking anywhere on the map")
        }
    }

    const MapEvents = () => {
        useMapEvents({
          click(e) {
            setMarkedPosition({
                lat:`${e.latlng.lat}`,
                lng:`${e.latlng.lng}`
            });
          },
        });
        return false;
    }

    if(fetching || error.length ){
        return <LoadingScreen error={error} />
    }

    return (
    <Grid sx={styles.container}>
        <Box sx={styles.mapContainer}>
            <MapContainer
                center={MAP_CENTER}
                zoom={ZOOM_LEVEL}
                ref={mapRef}
            >
                <TileLayer 
                    url={osmProvider.maptiler.url}
                    attribution={osmProvider.maptiler.attribution}
                />
                <MapEvents />
                <FiltersDialog 
                    setOpen={setShowFilterDialog}
                    open={showFiltersDialog}
                    radius={radius}
                    setRadius={setRadius}
                    setFilters={setFilters}
                />
                {
                    markedPosition.lat.length>0 && markedPosition.lng.length>0 &&
                    <ClickedPositionMarker 
                        markerCoords={markedPosition}
                        icon={pickedLocationMarkerIcon}
                        name={" Picked Location "}
                    />
                }
                {
                    location.loaded &&
                    <ClickedPositionMarker 
                        markerCoords={location.coordinates}
                        icon={myLocationMarkerIcon}
                        name={" Your Location "}
                    />
                }
                {
                    filteredData.length>0 ?
                    filteredData.map((data,index)=>{
                        const coordinates = {
                            lat:data.latitude,
                            lng:data.longitude
                        }
                        return (
                            <CustomMarker 
                                key={index}
                                markerCoords={coordinates}
                                icon={cameraMarkerIcon}
                                ownerId={data?.owner_id}
                            />
                        )
                    }) :                    
                    camerasData.map((data,index)=>{
                        const coordinates = {
                            lat:data.latitude,
                            lng:data.longitude
                        }
                        return (
                            <CustomMarker 
                                key={index}
                                markerCoords={coordinates}
                                icon={cameraMarkerIcon}
                                ownerId={data?.owner_id}
                            />
                        )
                    })
                }
            </MapContainer>
            <Button 
                variant={"contained"} 
                color='secondary' 
                sx={styles.filtersButton} 
                p={"10px 40px"} 
                onClick={handleFiltersButtonClick}
            >
                {
                    radius>0 ? 
                    <><CloseIcon/> Clear Filters </> : 
                    <><TuneIcon mr={"5px"}/> Filters </>
                }
                
            </Button>
            <Button 
                variant={"contained"} 
                color='primary' 
                sx={styles.locateMeButton} 
                p={"10px 40px"} 
                onClick={handleLocationFetch}
            >
                <MyLocationIcon mr={"5px"} /> Locate Me
            </Button>
        </Box>

    </Grid>
  )
}

export default AllCameras