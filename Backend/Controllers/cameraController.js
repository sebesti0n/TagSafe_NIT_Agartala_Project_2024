const db = require('knex')(require('../Configuration/DBConfig')['development']);

exports.addCamera = (async(req,res)=>{
    const {owner_id,longitude,latitude,RTSP_Link,pov_direction,resolution,cameraName,isLive,xAddress,username,password}=req.body;
    try {
        const cam = await db('cameras')
                .insert({
                    cameraName:cameraName,
                    owner_id:owner_id,
                    longitude:longitude,
                    latitude:latitude,
                    resolution:resolution,
                    pov_direction:pov_direction,
                    RTSP_Link:RTSP_Link,
                    isLive:isLive,
                    xAddress:xAddress,
                    username:username,
                    password:password
                }).returning('*');
                console.log("camera added ",cam);
        return res.status(200).json({success:true,message:"Camera Successfully Added"});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false,message:"unknown Error"});
    }
});
exports.getCamerasByOwnerId = ( async (req,res)=>{
    const uid=req.query.uid;
    try {
        const uCam = await db('cameras')
                    .where('owner_id','=',uid)
                    .returning('*')
        return res.status(200).json({success:true,message:"Successfully got user Camera List.",camera:uCam});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false,message:"Internal Server Error"});
    }
});

exports.deleteCamera = ( async(req, res)=>{
    const {cam_id} = req.body;
    try{
        const cam = await db('cameras')
            .where('cam_id', cam_id)
            .del()
            .returning('*');

        if(cam.length===0){
            return res.status(404).json({success: false, message: "Camera Not Found"});
        }
        return res.status(200).json({success: true, message: "Camera Successfully Deleted"});
    } catch(error) {
        console.log(error.message);
        return res.status(300).json({success: false, message: "Unknown error"});
    }
});

exports.editCamera = async (req, res) => {
    const { cam_id, owner_id, longitude, latitude, RTSP_Link, pov_direction, resolution, cameraName, isLive,xAddress,username,password} = req.body;

    try {
        const updatedCamera = await db('cameras')
            .where('cam_id', cam_id)
            .update({
                owner_id,
                longitude,
                latitude,
                RTSP_Link,
                pov_direction,
                resolution,
                cameraName,
                isLive,
                xAddress,
                username,
                password
            })
            .returning('*');

        if (updatedCamera.length === 0) {
            return res.status(404).json({ success: false, message: 'Camera not found' });
        }

        return res.status(200).json({ success: true, message: 'Camera Successfully Updated', camera: updatedCamera });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, message: 'Unknown Error' });
    }
};
