import React, { useState, useEffect } from "react";
import { Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ShowCourses() {
    const [courses, setCourses] = useState([]);

   useEffect(() => {
     fetch("https://localhost:4000/user/courses", {
        method: "GET",
        headers : {
            "content-type" : "application/json",
            "Authorization" : "Bearer "+localStorage.getItem("token")
        }
     }).then((res)=>{
            res.json().then((data)=> {
                setCourses(data.courses);
                // because we got an object
            })
     })
   }, [])
   
    // Add code to fetch courses from the server
    // and set it in the courses state variable.
    return <div >
     
        <h3 style={{display: "flex", fontFamily: "Rubik", fontSize: 42, justifyContent: "center"}}>what would you like to <div style={{color: "rgb(25, 118, 210)", marginLeft: 10}}>learn</div></h3>
        <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
        {courses.map(c => 
        <Course course={c} setCourses ={setCourses}/>,
        )}
        </div>
        
    </div>
}
// humne jab Course component render karaya upar to usme course prop pass kardia or c iterate jab har course ko karega to har course as a prop Course wale component me pass hojaega
function Course(props) {
    const navigate = useNavigate();
    const course = props.course;
    
    return <Card variant="outlined" style = {{
        width: 270,
        minHeight: 200,
        padding: 5,
        margin: 10
    }} 
    onClick ={() => navigate("/coursedetails/"+course._id)}
    >
        <img src={course.imageLink} style={{display: "flex", margin:"auto",width:270, height: 160, }}></img>
       <Typography textAlign={"center"} variant={"h6"}><p style={{fontSize: "18px", margin:2}}>{course.title}</p></Typography>
       
       <Typography textAlign={"center"}><p style={{margin:1}}>{course.description}</p></Typography> 
        <Typography textAlign={"center"}>${course.price}</Typography>
        
    </Card>
    
}

export default ShowCourses;