const onvif = require("node-onvif");

exports.returnCamerasList = async ()=>{
    console.log("Starting the discovery process")
    try{
        const devicesList = await onvif.startProbe();
        return devicesList;
    }
    catch(e){
        throw new Error(" Error while searching for cameras ")
    }
}

exports.returnDeviceInfo = async (xAddr,user,pass)=>{
    let device = new onvif.OnvifDevice({
        xaddr:xAddr,
        user,
        pass
    })
    return await device.getCurrentProfile();
}

exports.returnUdpStreamUri = async (device)=>{
    return device.getUdpStreamUrl();
}


