import { Grid } from "@mui/material"
import { useState } from "react";
import AllCameras from "./components/SearchCameras";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SearchVehicle from "./components/SearchVehicles";

function Dashboard() {

  const [showSidebar,setShowSidebar] = useState(false);
  const [menuState,setMenuState] = useState("All Cameras");

  const renderMenuScreen = ()=>{
    switch(menuState){
      case "All Cameras":
        return <AllCameras />
      case "Search Vehicle":
        return <SearchVehicle/>
      deafult:
        return <AllCameras />
    }
  } 

  return (
    <Grid>
      <Navbar setShowSidebar={setShowSidebar} menuState={menuState} />
      <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} setMenuState={setMenuState} />
      {renderMenuScreen()}
    </Grid>
  )
}

export default Dashboard