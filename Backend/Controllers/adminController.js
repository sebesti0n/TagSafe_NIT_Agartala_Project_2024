const db = require('knex')(require('../Configuration/DBConfig')['development']);
require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.addAdmin = (async (req,res)=>{
    const {email,password}=req.body
    
    console.log(req.body)
    try {
        const admin=await db('users').insert(
            {
                Email:email,
                Password:password,
                isAdmin:true
            }
        ).returning('*');

        return res.status(200).json({
            success: true,
            message: "Admin Added Successfully",
            admin: admin
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        });
        
    }
})
exports.adminLogin = (async (req, res) => {
    const {Email,Password} = req.body;
    console.log(Email);
    console.log(Password);
    console.log(req);

    try {
        const user = await db('users').where('Email', '=', Email).returning('*');
        if (user.length > 0 && user[0].Password === Password && user[0].isAdmin === true) {
            const token = jwt.sign({ id: user[0].user_id, name: user[0].Name }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
            return res.status(200).json({
                success: true,
                message: "Admin LoggedIn Successfully",
                token: token,
                user: user
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }
    } catch (error) {

        console.log(error)
        return res.status(500).json({ message: "Internal Server Error." })
    }

});
exports.getCameras = (async (req, res) => {
    const  uid = req.query.uid;
    try {
        const cameras = await db('cameras').returning('*');
        return res.status(200).json({ success: true, message: "Camera List got Successfully", camera: cameras});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal Server Error." })

    }
});

exports.getCameraOwner = ( async (req,res) => {
    const uid = req.query.uid;
    try {
        const owner = await db('users').where('user_id','=',uid).returning('Name','phoneNumber','addressLine1','city','state');
        return res.status(200).json({success:true,message:'Owner details got Successfully', owner:owner})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error." })
    }
});
