import { Marker, Popup } from "react-leaflet"
import { CircularProgress, Typography } from "@mui/material";
import axios from 'axios';
import { useEffect, useState } from 'react'


const CustomPopup = ({ownerId})=>{

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [ownerDets,setOwnerDets] = useState({name:"",address:"",phone:""});

  const fetchOwnerDetails = async()=>{
      setLoading(true);
      try{
          const token = localStorage.getItem("auth");
          const response = await axios.get(process.env.REACT_APP_API_ENDPOINT+"admin/camOwner?uid="+ownerId,{
              headers:{
                  authorizations:token,
              }
          })
          if(response?.status===200){
              const { data } = response;
              setOwnerDets({
                  name:data?.owner[0]?.Name,
                  address:data?.owner[0]?.addressLine1,
                  phone:data?.owner[0]?.phoneNumber
              })
          }
      }
      catch(e){
          console.log(e?.message);
          setError(e?.message)
      }
      setLoading(false);
  }

  useEffect(()=>{
      fetchOwnerDetails();
  },[])

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