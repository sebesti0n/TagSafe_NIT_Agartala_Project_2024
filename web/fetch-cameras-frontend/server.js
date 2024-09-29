const express = require("express")
const path = require('path');
const onvif = require("node-onvif");
const app = express();

app.set('view engine','ejs')
app.set('views', path.join(__dirname , '/views'))
app.use(express.static( path.join(__dirname , 'public')))

//parsing Application data
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const fetchOnvifCameras = async()=>{
    console.log("Starting the discovery process")
    try{
        const devicesList = await onvif.startProbe();
        console.log(devicesList);
        const device = new onvif.OnvifDevice({
            xaddr:devicesList[0].xaddrs[0],
            user:"admin",
            pass:"prakhar1",
        });
        const rawInfo = await device.init();
        const processedInfo = await {...JSON.parse(JSON.stringify(rawInfo,null, "  ")),xaddr:devicesList[0].xaddrs[0]};
        return processedInfo;
    }catch(e){
        console.log(e)
        throw new Error(" Error while detecting cameras")
    }
}

app.get("/:userId",async(req,res)=>{
    const {userId} = req.params;
    try{
        const allCameras =[await fetchOnvifCameras()];
        return res.render('pages/allCameras.ejs',{allCameras});
    }catch(e){
        console.log(e);
        return res.render('pages/error.ejs',{e});
    }
})
 
app.listen(4000,()=>{
    console.log("Listening on Port 4000")
})

