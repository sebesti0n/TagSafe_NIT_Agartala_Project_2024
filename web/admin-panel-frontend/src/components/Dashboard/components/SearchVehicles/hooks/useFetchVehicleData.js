import { useEffect, useState } from 'react'

const returnProcessedData = (rawData)=>{
    const processedData = rawData.map(str => {
        const s=str.substring(1,str.length-1);
        const keyValueStringsArray = s.split(",");
        const objectArray = keyValueStringsArray.map((string)=>{
            const [key,value] = string.split(":");
            return {
                [key.replace(/'/,' ').replace(/'/,' ').trim()]:value.replace(/'/,' ').replace(/'/,' ').trim()
            }
        })
        return objectArray;
    });

    return processedData;
}

const useFetchVehicleData = () => {

    const [vehiclesData,setVehiclesData] = useState([]);
    const returnVehicleData = async()=>{
        const response = await fetch(process.env.REACT_APP_NPR_API_ENDPOINT,{
            headers:{"ngrok-skip-browser-warning": "69420"}
        })
        const {data:rawData} =await response.json();
        setVehiclesData(returnProcessedData(rawData));
    }

    useEffect(()=>{
      returnVehicleData();
    },[])

  return {
    vehiclesData
  }
}

export default useFetchVehicleData