import { Box, Button, Dialog, DialogActions, DialogTitle, Slider, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';


const styles = {
    dialogBodyContainer:{
        padding:"10px 40px",
        width:"400px",
        paddingTop:"0",
    },
    dialogCloseIcon:{
        cursor:"pointer",
    },
    dialogHeader:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
    },
}

export const FiltersDialog = ({
    open,
    setOpen,
    radius,
    setRadius,
    setFilters
})=>{
    return (
        <Dialog open={open} handleClose={()=>setOpen(false)} >
        <DialogTitle sx={styles.dialogHeader}>Filters  <CloseIcon sx={styles.dialogCloseIcon} onClick={()=>setOpen(false)} />
        </DialogTitle>
            <Box sx={styles.dialogBodyContainer}>
                <Typography fontFamily={"Mulish"} fontSize={"16px"} ml={"-10px"} mb={"10px"}>
                    Select a radius in KMs - {radius} {radius!==0 ? (radius==1 ? "KM" : "KMs") : ""}
                </Typography>
                <Slider 
                    color={"secondary"} 
                    max={10} 
                    min={0} 
                    value={radius} 
                    onChange={(e)=>setRadius(e.target.value)} 
                    step={1}
                    defaultValue={0}
                />
            </Box>
        <DialogActions>
            <Button onClick={setFilters}>
                Apply Filters
            </Button>
        </DialogActions>
        </Dialog>
    )
}