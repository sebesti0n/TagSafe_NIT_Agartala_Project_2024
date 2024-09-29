import { Box, Grid, LinearProgress, Typography } from "@mui/material"


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
    loadingContainer:{
        width:"100%",
        height:"100%",
        display:'flex',
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
    },
    loadingProgressBar:{
        height:"8px",
        width:"300px",
        borderRadius:"2px",
        background:"black",
        margin:"40px"
    },
}


export const LoadingScreen = ({error})=>{
    return (
    <Grid sx={styles.container}>
        <Box sx={styles.mapContainer}>
            <Box sx={styles.loadingContainer}> 
            <Typography fontFamily={"Mulish"} fontSize={"20px"} color={"#CDCDCD"}>
            { error.length>0 ? error : "Fetching Cameras Data..." }
            </Typography>
            { !error.length>0 &&
                <LinearProgress sx={styles.loadingProgressBar}/>
            }
            </Box>
        </Box>
    </Grid>)
}