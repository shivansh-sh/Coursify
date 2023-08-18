import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";


function Appbar(){
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const showButton = location.pathname === "/showcourses"

    useEffect(() => {
        fetch("https://localhost:4000/admin/me", {
            method: "GET",
            headers: {
                "Authorization" : "Bearer "+ localStorage.getItem("token")
            }
        }).then((res)=> {
            res.json().then((data)=> {
                console.log(data)
                if (data.username){
                    // alert(data.message);
                    setUserEmail(data.username)
                }
                setLoading(false)
            })
        })
    }, [])

    if(loading) {
        return <div style={
            {
                display: "flex",
                justifyContent:"space-between",
                paddingLeft: 10,
                paddingRight: 15,
                background: "#1976d2"
            }
        }>
            <h3 style={{
                color: "white",
                fontFamily: 'monospace',
                fontSize: "18px",
                marginLeft: "10px",
                fontWeight: 700,
                letterSpacing: '.3rem',
            }} onClick={()=> {navigate("/")}} >COURSIFY</h3>
            <div style={{
                display: "flex",
                alignItems:"flex-end",
                gap: 10,
                marginBottom: 10
            }}>
               <Button style={{
                width: "90px",
                color: "white"
            }} variant="outlined" onClick={()=> {navigate("/register")}}>Register</Button>
             <br/>
             <div style={{
                marginLeft: "10px"
             }}>

             <Button style={{
                 width: "70px",
                 color: "white"
                }} variant="outlined" onClick={()=> {navigate("/login")}}>Login</Button>
            </div>
        </div>
        </div>
    }
    else{

        return <div style={
            {
                display: "flex",
                justifyContent:"space-between",
                paddingLeft: 10,
                paddingRight: 15,
                background: "#1976d2"
            }
        }>
            <h3 style={{
                color: "white",
                fontFamily: 'monospace',
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: '.3rem',
            }} onClick={()=> {navigate("/")}} >COURSIFY</h3>
            <div style={{
                display: "flex",
                alignItems:"flex-end",
                gap: 10,
                marginBottom: 10
            }}>
               <Typography> <div style={{color: "white", marginBottom: 6}}>{userEmail}</div></Typography>
               <Button style={{
                width: "90px",
                color: "white"
            }} variant="outlined" onClick={()=> {
                localStorage.setItem("token", null)
                window.location ="/"
            }}><Typography>Logout</Typography></Button>
             <br/>
             {showButton && <Button style={{
                 width: "70px",
                 color: "#1976D2",
                 fontWeight: "bold",
                 background: "white",
                 borderRadius: 10
                }} variant="contained" onClick={() => navigate("/createcourses")}>create</Button>}
             
        </div>
      </div>
}
    
}
    
export default Appbar;