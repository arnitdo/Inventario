import React, {useCallback, useState} from 'react';
import { Avatar, Grid,Paper, TextField, Button } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import BusinessIcon from '@mui/icons-material/Business';
import {AuthContextType, UserRole} from "../App";
import {useNavigate} from "react-router-dom";

export type LoginPageProps = {
  setAuthState: (value: (((prevState: AuthContextType) => AuthContextType) | AuthContextType)) => void
}

function Login(props: LoginPageProps){
  const paperStyle = {padding: 20, maxWidth: 400, margin: "100px auto"}
  const avatarStyle = {backgroundColor: "#1976d2"}
  const iconStyle = {backgroundColor: "#1976d2",marginTop:'10px'}

  const [orgId, setOrgId] = useState<string>("")
  const [userId, setUserId] = useState<string>("")
  const [userPassword, setUserPassword] = useState<string>("")

  const redirect = useNavigate()

  const makeLoginRequest = useCallback(async () => {
    try {
      const resp = await fetch(
        `http://localhost:8800/api/orgs/${orgId}/login`,
        {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId, userPassword
          })
        }
      )

      const respJson = // await resp.json()
        {
          status: "SUCCESS",
          authDetails: {
            orgId: orgId,
            userRole: "ADMINISTRATOR" as UserRole
          }
        }

      const {status} = respJson

      if (status === "SUCCESS"){
        const {orgId, userRole} = respJson.authDetails
        props.setAuthState({
          isAuthenticated: true,
          authenticatedRole: userRole,
          authenticatedOrg: orgId
        })
      }
    } catch (err){
      console.error(err)
    }
  }, [orgId, userId, userPassword, redirect])

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

			<br/><br />

            <div style={{display:'flex',gap:'0.5rem'}}>
              <Avatar style={iconStyle}><BusinessIcon fontSize='small'></BusinessIcon></Avatar>
              <TextField
              id="outlined-basic" label="Organization Id" variant="outlined" fullWidth required
              onChange={e => setOrgId(e.target.value)}
              />
            </div>
            
            <br></br>
            <div style={{display:'flex',gap:'0.5rem'}}>
              <Avatar style={iconStyle}><AccountCircleIcon fontSize='small'></AccountCircleIcon></Avatar>
              <TextField
                id="outlined-basic" label="Username" variant="outlined" fullWidth required
                onChange={e => setUserId(e.target.value)}
              />
            </div>
            
            <br></br>
            <div style={{display:'flex',gap:'0.5rem'}}>
              <Avatar style={iconStyle}>
                <PasswordIcon fontSize='small' />
              </Avatar>
              <TextField
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                required
                onChange={e => setUserPassword(e.target.value)}
              />
            </div>
            
            <br></br>
            <br></br>
            <center>
              <Button variant="contained" fullWidth onClick={() => makeLoginRequest()}>
                Login
              </Button>
            </center>
        </Paper>
    </Grid>
    </>
  )
}

export {Login}