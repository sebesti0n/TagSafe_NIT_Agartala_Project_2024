import { useState } from 'react'

const useGeoLocation = () => {

    const [location,setLocation] = useState({
        loaded:false,
        coordinates:{ lat: "", lng: "" }
    });

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates:{
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }
        })
    }

    const onError = (error) => {
        setLocation({
            loaded: true,
            error,
        })
    }

    const fetchLocation = ()=>{
        if( !("geolocation" in navigator) ){
            setLocation({
                loaded:true,
                error:{
                    code: 0,
                    message: "Geolocation Not Supported"
                },
            })
        }
        else{
            navigator.geolocation.getCurrentPosition(onSuccess,onError)
        }
    }

  return {
    location,
    fetchLocation,
  }
}

export default useGeoLocation