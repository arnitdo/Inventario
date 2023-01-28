import React from 'react';
import { Avatar, Grid,Paper, TextField, Button } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import BusinessIcon from '@mui/icons-material/Business';


function Login(){
  const paperStyle = {padding: 20, maxWidth: 400, margin: "100px auto"}
  const avatarStyle = {backgroundColor: "#1976d2"}
  const iconStyle = {backgroundColor: "#1976d2",marginTop:'10px'} 
  return (
    <>
      <Grid sx={{fontFamily:"sans-serif", margin: "25px"}}>
        <Paper elevation={10} style={paperStyle}>
            <Grid>
                <center>
                  <Avatar style={avatarStyle}><LockIcon></LockIcon></Avatar>
                  <h2>Login</h2>
                </center>
            </Grid>
            <div style={{display:'flex',gap:'0.5rem'}}>
            <Avatar style={iconStyle}><BusinessIcon fontSize='small'></BusinessIcon></Avatar><TextField id="outlined-basic" label="Organization Id" variant="outlined" fullWidth required/> 
            </div>
            
            <br></br>
            <div style={{display:'flex',gap:'0.5rem'}}>
            <Avatar style={iconStyle}><AccountCircleIcon fontSize='small'></AccountCircleIcon></Avatar><TextField id="outlined-basic" label="Username" variant="outlined" fullWidth required/> 
            </div>
            
            <br></br>
            <div style={{display:'flex',gap:'0.5rem'}}>
            <Avatar style={iconStyle}><PasswordIcon fontSize='small'></PasswordIcon></Avatar><TextField id="outlined-basic" label="Password" type="password" variant="outlined" fullWidth required/>
            </div>
            
            <br></br>
            <br></br>
            <center><Button variant="contained" fullWidth>Login</Button></center>
        </Paper>
    </Grid>
    </>
  )
}

export {Login}