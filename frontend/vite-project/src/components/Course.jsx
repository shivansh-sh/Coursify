import React, { useState } from "react";
import { Card, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function Course(){
 

    const [course, setCourse] = useState(null);
    const {courseId} = useParams();
    // const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch("https://localhost:4000/admin/course/"+courseId, {
            method : "GET",
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem("token")
            }
        }).then((res) => {
            res.json().then((data) => {
              setCourse(data.course);
            //   setLoading(false);
            })
        })
        .catch((err) => console.log(err));
    }, [])
    

    if(!course){
            return <div>loading...</div>
    }

    else{
        return <div>
        <div style={{ display:"flex", justifyContent: "center", alignItems:"center", height: 100,background: "black" , color: "white", }}><TitleInBackground title ={course.title} /></div>
        
        <div style={{ display :"flex", justifyContent: "space-around"}}>
        <CourseCard course={course} />
        <UpdateCard course={course} setCourse={setCourse}/>
        </div>
        </div>
    }
}

function TitleInBackground({title}) {
    return <div>
        <Typography><p style={{fontSize: "38px", fontWeight: 600, padding:10}}>{title}</p></Typography>
    </div>
}

function CourseCard(props){
    const course = props.course;
    return (
        <div style={{marginTop: -40}}>
            <Card variant="outlined" style = {{
            width: 270,
            minHeight: 200,
            padding: 5,
            margin: 10
        }}>
            <img src={course.imageLink} style={{display: "flex", margin:"auto",width:270, height: 160, }}></img>
        <Typography textAlign={"center"} variant={"h6"}><p style={{fontSize: "18px", margin:2}}>{course.title}</p></Typography>
        
        <Typography textAlign={"center"}><p style={{margin:1}}>{course.description}</p></Typography> 
            <Typography textAlign={"center"}>{course.price}</Typography>
           
        </Card>
    </div>
    )
}

function UpdateCard({course, setCourse}){
    const [title, setTitle] = useState(course.title);
    const [description, setDescription] = useState(course.description);
    const [price, setPrice] = useState(course.price);
    const [image, setImage] = useState(course.imageLink);
    const navigate = useNavigate();

    return <div style={{
                display: "flex",
                justifyContent: "center",
                padding: 30
                }}>
    <Card variant="outlined" style = {{
                width: 350,
                height: 300, padding: 20,
                borderRadius: 15
                }}>


    <div style={{
        padding: 10
    }}>

    <TextField value={title} onChange={ e => setTitle(e.target.value)} id="outlined-basic" label="title" variant="outlined" fullWidth={true}  size="small"/>
    <br/><br/>
    <TextField value={description} onChange={ e => setDescription(e.target.value)} id="outlined-basic" label="description" variant="outlined" fullWidth={true}  size="small"/>
    <br/><br/>
    <TextField value={price} onChange={e => setPrice(e.target.value)} id="outlined-basic" label="price" variant="outlined" fullWidth={true}  size="small"/>
    <br/><br/>
    <TextField value={image} onChange={e => setImage(e.target.value)} id="outlined-basic" label="image-link" variant="outlined" fullWidth={true}  size="small"/>
    <br/><br/>
    
    <div style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "80px"
    }}>
        
        <Button style={{ width: "165px"}} variant="contained" 
           onClick={ ()=> {
            fetch("https://localhost:4000/admin/courses/"+course._id,
            {
                method: "PUT",
                body :JSON.stringify({
                    title : title,
                    description: description,
                    price: price,
                    imageLink: image,
                    published: true,
                }),
                headers: {
                    "content-type" : "application/json",
                    "Authorization" : "Bearer "+localStorage.getItem("token")
                }
            }).then((res) => {
                res.json().then((data) => {
                    alert("course updated !!!");
                    setCourse(data.course);
                    navigate("/showcourses");
                })
            })
           }}
        >Update Course</Button>
         <br/>
         <div style={{
            marginLeft: "10px"
         }}>
        </div>
    </div>
    </div>
    </Card>
    <div>
</div>
</div>

}

export default Course;