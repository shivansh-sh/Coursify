import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card , Typography } from '@mui/material';
import { Button } from '@mui/material';
import { TextField,InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const navigate = useNavigate();

    return <div>
        <div style={{
        display: "flex",
        justifyContent: "center",
        padding: 30
    }}>
            <Card variant="outlined" style = {{
            width: 350,
            height: 310, padding: 20
        }}>

        <h2 style={{ display: "flex", justifyContent: "center", marginLeft: 15,  fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.2rem'}}>Login to admin dashboard</h2>
        
        <div style={{
            padding: 10
        }}>

        <TextField onChange={ e => setEmail(e.target.value)} id="outlined-basic" label="email" variant="outlined" fullWidth={true}  size="small"/>
        <TextField onChange={ e => setPassword(e.target.value)} id="outlined-basic" label="password" variant="outlined" fullWidth={true} style={{marginTop : 8}} size="small"
        type={showPassword ? 'text' : 'password'} // Toggle password visibility
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={event => event.preventDefault()}
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                  ),
              }}
        />
        <br/><br/>
        <div style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "110px"
        }}>

            <Button style={{
                width: "90px",
            }} variant="outlined" onClick={ ()=> {
                fetch("https://localhost:4000/admin/login", {
                    method : "POST",
                    body : JSON.stringify({
                        username : email,
                        password : password
                    }),
                    headers : {
                        "content-type" : "application/json"
                    }
                }).then((response)=> {
                    response.json().then((data)=> {
                        localStorage.setItem("token", data.token);
                        alert(data.message)
                        window.location ="/showcourses"
                        // navigate("/showcourses")

                    })
                })
            }} >Login</Button>
             <br/>
             <div style={{
                marginLeft: "10px"
             }}>
            </div>
        </div>
        </div>

        {/* <input type={"text"} onChange={e => setEmail(e.target.value)} /> */}
        {/* <br/> */}
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "5px"
        }}>
        <h4><Typography>New Here? 👉</Typography></h4>
        <Button style={{
            width: "100px",
            height: "30px",
            marginTop: "17px",
            marginLeft: 5
        }} variant="contained" onClick={()=> {navigate("/register")}}>Register</Button>
        </div>
       
        </Card>


    </div>
    </div>
}

export default Login;
