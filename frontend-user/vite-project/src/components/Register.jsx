import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';


/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div style={{
        display: "flex",
        justifyContent: "center",
        padding: 30
    }}>
            <Card variant="outlined" style = {{
            width: 360,
            height: 320, padding: 20
        }}>

<h2 style={{ display: "flex", justifyContent: "center", marginLeft: 10,  fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.2rem'}}>Register a New Account</h2>
        <div style={{
            padding: 10
        }}>

        <TextField onChange={ e => setEmail(e.target.value)} id="outlined-basic" label="email" variant="outlined" fullWidth={true}  size="small"/>
        <br/><br/>
        <TextField onChange={ e => setPassword(e.target.value)} id="outlined-basic" label="password" variant="outlined" fullWidth={true}  size="small" />
        <br /><br/>
        <div style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "110px"
        }}>
            {/* this register button is used to register admin  */}
            <Button style={{ width: "90px"}} variant="outlined" 
                onClick={() => {
                    fetch("https://localhost:4000/user/signup", 
                    {
                        method: "POST",
                        body: JSON.stringify({
                            username : email,
                            password : password
                        }),
                        headers: {
                            "content-type" : "application/json"
                        }
                    }).then((response) => {
                        response.json().then((data) => {
                            localStorage.setItem("token", data.token);
                            alert(data.message)
                            navigate("/login")
                            //  so that we dont need to refresh it just gives us the / page 
                        
                        })
                    })
                }}
            >Register</Button>
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
        <h4><Typography> Already registered🚀 </Typography></h4>
        <Button style={{
            width: "70px",
            height: "30px",
            marginTop: "17px",
            marginLeft: 5
        }} variant="contained" onClick={()=> {navigate("/login")}}>Login</Button>
        </div>
       
        </Card>
    </div>
}

export default Register;