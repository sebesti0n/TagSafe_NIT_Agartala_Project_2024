const db = require('knex')(require('../Configuration/DBConfig')['development']);




exports.registration = (async (req,res)=> {
    const{Email,Name,ConfirmPassword,Password,addressLine1,city,state,phoneNumber,aadharNumber}=req.body;
    try {
        const findUser = await db('users')
            .where('Email','=',Email).returning('*');
        if(findUser.length>0){
            return res.status(200).json({success:true, message:"Already Registered", user: null});

        }
        else {
       const user = await db('users')
        .insert({
            Email:Email,
            Password:Password,
            ConfirmPassword:ConfirmPassword,
            Name:Name,
            addressLine1:addressLine1,
            city:city,
            state:state,
            phoneNumber:phoneNumber,
            aadharNumber:aadharNumber           
        }).returning('*');
        console.log(user);
        return res.status(200).json({success:true, message:"Registered", user: user});
}
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false, message:error, user: null});
        
    }
});
exports.login = (async (req,res) => {
    const email = req.query.email;
    const password = req.query.password;
    try {
        const user = await db('users')
        .select('*')
        .where('Email',email)
        .andWhere('Password',password);
        if(user.length>0){
            return res.status(200).json({success:true, message:"Login Successfully", user: user});
        }
        else{
            return res.status(200).json({success:true, message:"wrong Credentials or Registered First", user: null});

        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({success:false, message:error, user: null});
    }
});


