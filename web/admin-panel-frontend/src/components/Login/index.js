import { useState } from 'react'
import { styles } from './styles'
import { Alert, Box, Button, CircularProgress, Grid, Input, InputLabel, Snackbar, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SnackBarMessage = ({showSnackbar,handleClose,message,severity="error"})=>{
    return (
    <Snackbar 
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical:"top", horizontal:"center" }}
    >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
    )
}

function Login() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [successMsg,setSuccessMsg] = useState("");
    const [showSnackbar,setShowSnackbar] = useState(false);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClose = ()=>{
        setShowSnackbar(false);
        setError("")
        setSuccessMsg("")
    }

    const handleSubmit = async()=>{
        if(email.length===0 || password.length===0){
            setError(" Invalid Input ")
            setShowSnackbar(true);
            return;
        }else {
            setLoading(true);
            try{
                const response = await axios.post(process.env.REACT_APP_API_ENDPOINT+'admin/login', {
                    Email: email,
                    Password: password,
                  });
                if(response?.status===200){
                    const { data } = response;
                    localStorage.setItem("auth",data?.token);
                    localStorage.setItem("userName",data?.user[0]?.Name);
                    localStorage.setItem("userId",data?.user[0]?.user_id);
                    setSuccessMsg("Logged In successfuly, Redirecting...")
                    setShowSnackbar(true);
                    setTimeout(()=>{
                        navigate('/')
                    }, 1000)
                }
            }
            catch(e){
                if(e?.response?.status===401){
                    setError("Invalid Credentials");
                    setShowSnackbar(true);
                }
                else{
                    setError(e?.status);
                    setShowSnackbar(true);
                }
            }
            setLoading(false);
        }
    }
    
  return (
    <Grid sx={styles.loginContainer}>
        {
            showSnackbar && error.length>0 &&
            <SnackBarMessage 
                showSnackbar={showSnackbar}
                setShowSnackbar={setShowSnackbar}
                handleClose={handleClose}
                message={error}
            />
        }
        {
            showSnackbar && successMsg.length>0 &&
            <SnackBarMessage 
                showSnackbar={showSnackbar}
                setShowSnackbar={setShowSnackbar}
                handleClose={handleClose}
                message={successMsg}
                severity='success'
            />
        }
        <Box sx={styles.loginBox}>
        <form>
        <Typography
                fontFamily={"Ubuntu"}
                fontSize={"25px"}
                mb={"20px"}
            >
                Login
            </Typography>
            <Box sx={styles.loginFormInput}>
                <TextField 
                    label="Email" 
                    variant="outlined" 
                    value={email} 
                    onChange={(e)=>setEmail(e.target.value)} 
                    type={"email"}
                    required 
                />
            </Box>
            <Box sx={styles.loginFormInput}>
                <TextField 
                    label="Password" 
                    variant="outlined" 
                    value={password} 
                    type='password'
                    onChange={(e)=>setPassword(e.target.value)} 
                    required     
                />
            </Box>
            <Button sx={styles.loginButton} variant='contained' onClick={handleSubmit} type={"submit"} disabled={loading} >
                {
                    loading ? 
                    "Signing in..." :
                    "Admin Login" 
                }
            </Button>
        </form>
        </Box>    
    </Grid>
  )
}

export default Login