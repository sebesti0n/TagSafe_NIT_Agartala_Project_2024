import axios from 'axios';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const useFetchCameras = ({
    setFetching,
    setCamerasData,
    setError
}) => {

    const navigate = useNavigate();

    const fetchCameraData = async()=>{
        setFetching(true);
        const token = localStorage.getItem("auth");
        const uid = localStorage.getItem("userId");
        try{
            const response = await axios.get(process.env.REACT_APP_API_ENDPOINT+"admin/getCameras?uid="+uid,{
                headers:{
                    authorizations:token,
                }
            })
            const { data } = response;
            setCamerasData([...data?.camera])
        }
        catch(e){
            if(e.response.status===401){
                setError("Unauthorized Redirecting to login Page ...");
                setTimeout(()=>{
                    navigate("/login")
                },2000)
            }else{
                setError(e.message)
            }
        }
        setFetching(false);
    }

    useEffect(()=>{
        fetchCameraData();
    },[])

  return {

  }
}

export default useFetchCameras