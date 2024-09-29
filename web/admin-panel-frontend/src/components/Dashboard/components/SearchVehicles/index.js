import { Box, Grid, TextField, Button, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from "react";
import { renderInMap } from "../../../utils/utils";
import useFetchVehicleData from "./hooks/useFetchVehicleData";

const styles = {
    root:{
        minHeight:"100vh",
        width:"100%",
        background:"grey",
        paddingTop:"20px",
        paddingBottom:"30px",
    },
    container:{
        maxWidth:"800px",
        width:"800px",
        height:"100%",
        margin:"0px auto 0 auto",
        borderRadius:"10px",
    },
    searchInput:{
        position:"relative",
        "& svg":{
            position:"absolute",
            right:"10px",
            fontSize:"40px",
            top:"8px",
        },
        "& .MuiInputBase-input":{
            background:"#CDCDCD",
            borderRadius:"4px",
        }
    },
    searchResultsCard:{
        fontFamily:"Poppins",
        fontSize:"20px",
        backgroundColor:"#CDCDCD",
        borderRadius:"4px",
        padding:"20px 15px",
    },
    cardHeader:{
        display:'flex',
        justifyContent:"space-between",
        alignItems:"center",
    }
}

const VehicleDataCard = ({
    licensePlate,
    timestamp,
    latitude,
    longitude
})=>{
    return (
    <Box sx={styles.searchResultsCard} my={"20px"}>
        <Grid sx={styles.cardHeader}>
            <Box>Vehicle No - {licensePlate}</Box>
            <Box>{timestamp}</Box>
        </Grid>
        <Button variant="contained" color={"primary"} sx={{marginTop:"20px"}} onClick={()=>renderInMap(latitude,longitude)}>
            <LocationOnIcon mr={"2px"}/> Check on map 
        </Button>
    </Box> 
    )
}

function SearchVehicle() {

    const [searchInput,setSearchInput] = useState("");

    const { vehiclesData } = useFetchVehicleData();

  return (
    <Grid sx={styles.root}>
        <Grid sx={styles.container}>
            <Box sx={styles.searchInput} mb={"20px"}>
            <TextField 
                value={searchInput}
                onChange={(e)=>setSearchInput(e.target.value)}
                label={""} 
                id="margin-none" 
                placeholder="Enter a number plate" 
                background={"white"} 
                fullWidth 
            />
            <SearchIcon />
            </Box>
            <Typography
                fontFamily={"Mulish"}
                fontSize={"20px"}
                fontStyle={500}
                textAlign={"left"}
                ml={"10px"}
            >
                All Results
            </Typography>
            {
                vehiclesData.length===0 &&
                <Typography 
                    fontFamily={"Mulish"}
                    fontSize={"25px"}
                    ml={"10px"}
                    fullWidth
                    align="center"
                >
                    No data found
                </Typography>
            }
            {
                vehiclesData?.map((vehicle)=>(
                    <VehicleDataCard 
                        licensePlate={vehicle[1].licensePlate}
                        latitude={vehicle[3].latitude}
                        longitude={vehicle[4].longitude}
                        timestamp={vehicle[5].timestamp}
                    />))
            } 

        </Grid>

    </Grid>
  )
}

export default SearchVehicle