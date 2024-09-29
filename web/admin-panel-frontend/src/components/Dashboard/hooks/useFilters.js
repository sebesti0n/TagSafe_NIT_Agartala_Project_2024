import { calculateDistance } from "../../utils/utils";

const useFilters = ({
    radius,
    setFilteredData,
    camerasData,
    setShowFilterDialog,
    markedPosition,
}) => {

    const setFilters = ()=>{
        if(radius===0){
            setFilteredData([]);
        }else{
            const tempFilteredData = camerasData.filter((camera)=>{
                return calculateDistance(markedPosition,{ lat:camera.latitude, lng:camera.longitude }) < radius ;
            })
            setFilteredData(tempFilteredData);
        }
        setShowFilterDialog(false);
    }

  return{
        setFilters
    }
}

export default useFilters