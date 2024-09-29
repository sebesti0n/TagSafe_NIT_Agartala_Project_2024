export const styles = {
    loginContainer:{
        width:"100vw",
        height:"100vh",
        background:"#CDCDCD",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    loginBox:{
        background:"white",
        width:"fit-content",
        padding:"40px 80px",
        borderRadius:"10px",
        margin:"40px",
        "& form":{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column",
        }
    },
    loginFormInput:{
        margin:"0px 0 20px 0"
    },
    loginButton:{
        background:"#2EA043",
        color:"white",
        margin:"auto",
        "&:hover":{
            background:"#006127"
        },
        "&.Mui-disabled":{
            background:"#006127",
            color:"white",
        },
        marginTop:"15px"
    }
}