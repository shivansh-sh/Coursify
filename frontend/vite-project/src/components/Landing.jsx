import { useNavigate } from "react-router-dom";
import React from "react";
import Button from '@mui/material/Button';
import pic1 from "../assets/5.jpg"

function Landing() {
    const navigate = useNavigate();
    return <>
      
    <div style={{display: "flex"}}>
        <div style={{
            fontFamily: 'monospace', fontSize: "28px", fontWeight: 700, letterSpacing: '.3rem', marginLeft: "120px", marginTop: "120px"
        }}>
        <h2 >Welcome to Coursify</h2> 
        <p style={{fontSize:24, marginLeft: 35}}> Be a 100x Developer🚀</p>
        
        </div>
        <img style={{height: 300, width: 350, marginTop: 100, marginLeft: 170 , borderRadius: 10}} src={pic1} alt="" />
    </div>
        <div style={{marginTop: -70, marginLeft: 210}}> <p style={{fontSize:22 ,fontFamily: 'monospace', fontWeight: 600, letterSpacing: '.1rem'}}>Are you a new admin?</p>
        <Button style={{height: 35,marginTop:18, marginLeft:50,borderRadius: 20}} onClick={()=> {navigate("/register")}} variant="contained" >Click here</Button> 
        </div>
      
    </>
}

export default Landing;
