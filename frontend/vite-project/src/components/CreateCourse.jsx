import React, { useState } from "react";
import { Card, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();
    
    return <div style={{
        justifyContent: "center",
        padding: 30
    }}>
            <h3 style={{display: "flex", fontFamily: "Rubik", fontSize: 42, justifyContent: "center"}}>what would you like to <div style={{color: "rgb(25, 118, 210)", marginLeft: 10}}>Create</div></h3>

        <div style={{display: "flex", justifyContent: "center"}}>
        <Card variant="outlined" style = {{           
            width: 350,
            height: 300, padding: 20,
            borderRadius: 15,
        }}>


        <div style={{
            padding: 10
        }}>

        <TextField onChange={ e => setTitle(e.target.value)} id="outlined-basic" label="title" variant="outlined" fullWidth={true}  size="small"/>
        <br/><br/>
        <TextField onChange={ e => setDescription(e.target.value)} id="outlined-basic" label="description" variant="outlined" fullWidth={true}  size="small"/>
        <br/><br/>
        <TextField onChange={e => setPrice(e.target.value)} id="outlined-basic" label="price" variant="outlined" fullWidth={true}  size="small"/>
        <br/><br/>
        <TextField onChange={e => setImage(e.target.value)} id="outlined-basic" label="image-link" variant="outlined" fullWidth={true}  size="small"/>
        <br/><br/>
        
        <div style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "80px"
        }}>
        
            <Button style={{ width: "165px"}} variant="contained" 
                onClick={() => {
                    fetch("https://localhost:4000/admin/courses", 
                    {
                        method: "POST",
                        body: JSON.stringify({
                            title : title,
                            description : description,
                            price: price,
                            imageLink: image,
                            published: true
                        }),
                        headers: {
                            "content-type" : "application/json",
                            "Authorization" : "Bearer " + localStorage.getItem("token")
                        }
                    }).then((response) => {
                        response.json().then((data) => {
                            navigate("/showcourses")
                        })
                    })
                }}
            >Create Course</Button>
             <br/>
             <div style={{
                marginLeft: "10px"
             }}>
            </div>
        </div>
        </div>
        </Card>
        </div>

        <div>
    </div>
    </div>


}
export default CreateCourse;