import React,{useState} from "react";
import { Avatar, Grid, Paper, TextField, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import BusinessIcon from "@mui/icons-material/Business";

const SignUpPage = () => {
  const paperStyle = { padding: 20, maxWidth: 400, margin: "100px auto" };
  const avatarStyle = { backgroundColor: "#1976d2" };
  const iconStyle = { backgroundColor: "#1976d2", marginTop: "10px" };

  const [orgId, setOrgId] = useState/*<string>*/("")

  const [display,setDisplay] = useState(false)
  const handleSignIn=()=>{
    if (orgId != ""){
        setDisplay(true);
    }    
  }
  return (
    <>
    <Grid sx={{ fontFamily: "sans-serif" }}>
      <Paper elevation={10} style={paperStyle}>
        <Grid>
        <center><Avatar style={avatarStyle}>
            <LockIcon></LockIcon>
          </Avatar>
          <h2>Sign Up</h2></center>
        </Grid>
        
        {!display && (<div style={{ display: "flex", gap: "0.5rem" }}>
          <Avatar style={iconStyle}>
            <BusinessIcon fontSize="small"></BusinessIcon>
          </Avatar>
          <TextField
            id="outlined-basic"
            label="Organization Id"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setOrgId(e.target.value.trim())}
          />
        </div>)}
        {display && (<div style={{ display: "flex", gap: "0.5rem" }}>
          <Avatar style={iconStyle}>
            <AccountCircleIcon fontSize="small"></AccountCircleIcon>
          </Avatar>
          <TextField
            id="outlined-basic"
            label="Admin ID"
            variant="outlined"
            fullWidth
            required
          />
        </div>)}
        <br></br>
        <br></br>

        {display && (<div style={{ display: "flex", gap: "0.5rem" }}>
          <Avatar style={iconStyle}>
            <PasswordIcon fontSize="small"></PasswordIcon>
          </Avatar>
          <TextField
            id="outlined-basic"
            label="Admin Password"
            type="password"
            variant="outlined"
            fullWidth
            required
          />
        </div>)}
        <br></br>
        
        <center>
          <Button variant="contained" fullWidth onClick={handleSignIn}>
            {!display ? 'Next' : 'Get Started'}
          </Button>
        </center>
      </Paper>
    </Grid>
    </>
  );
};

export { SignUpPage };
