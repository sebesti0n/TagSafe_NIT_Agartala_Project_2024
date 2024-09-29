import { Button, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const styles = {
    primaryBox:{
        height:"65px",
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        paddingRight:"80px",
    },
    drawerStyles:{
        "& .MuiPaper-root":{
            background:"black",
            color:"white"
        },
        "& svg":{
            color:"white",
        },
        "& .MuiListItemIcon-root":{
            minWidth:"45px"
        }
    },
    menuIcon:{
        color:"white",
        fontSize:"35px",
        margin:"0 15px",
        cursor:"pointer"
    },
}

const SidebarButton = ({icon,text,handleClick})=>{

    return (
        <ListItemButton sx={{background:"black",marginBottom:"10px"}} onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{text}</ListItemText>
        </ListItemButton>
    )
}



function Sidebar({showSidebar,setShowSidebar,setMenuState}) {

    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem("userId");
        localStorage.removeItem("auth");
        localStorage.removeItem("userName");
        navigate("/login")
    }

  return (
    <Drawer
        open={showSidebar}
        anchor={"left"}
        onClose={()=>setShowSidebar(false)}
        sx={styles.drawerStyles}
    >
        <Grid sx={styles.primaryBox}>
            <MenuIcon sx={styles.menuIcon} onClick={()=>setShowSidebar(false)} />
            <Typography
                fontFamily={"Montserrat"}
                fontSize={"20px"}
                color={"white"}
            >
               Dashboard
            </Typography>
        </Grid>
        <List>
            <ListItem disablePadding>
                <SidebarButton 
                    icon={<VideocamIcon />} 
                    text={"All Cameras"} 
                    handleClick={()=>setMenuState("All Cameras")}     
                />
            </ListItem>
            <ListItem disablePadding>
                <SidebarButton 
                    icon={<PersonSearchIcon />} 
                    text={"Search Vehicle"} 
                    handleClick={()=>setMenuState("Search Vehicle")} 
                />
            </ListItem>
        </List>
        <Grid sx={styles.logoutButton} px={"20px"} position={"absolute"} bottom={"20px"} width={"258px"}>
            <Button variant='outlined' fullWidth color='inherit' onClick={handleLogout}>
                Log out
            </Button>
        </Grid>
    </Drawer>
  )
}

export default Sidebar