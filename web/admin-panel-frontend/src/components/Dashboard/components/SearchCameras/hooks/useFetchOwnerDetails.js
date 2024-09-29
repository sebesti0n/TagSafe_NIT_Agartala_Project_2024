import axios from 'axios';
import { useEffect, useState } from 'react'


const useFetchOwnerDetails = ({ownerId}) => {

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

  return {
    loading,
    error,
    ownerDets
  }
}

export default useFetchOwnerDetails