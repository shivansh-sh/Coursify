import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card, Typography } from '@mui/material';

import { useRecoilState, useRecoilValue } from "recoil";
import { courseState, purchasedCoursesState } from "../atom/recoilState";

function CourseDetails(){
    const {courseId} = useParams();
    const [course, setCourse] = useRecoilState(courseState);
    // const purchasedCourses = useRecoilValue(purchasedCoursesState);

   
    
    
    
    useEffect(()=>{
        fetch("https://localhost:4000/user/course/"+courseId, {
            method: "GET",
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem("token")
            }
        }).then((res)=> {
            res.json().then((data) => {
                console.log("hanji")
                setCourse(data.course)
            })
        });

    }, []);

    if(!course){
        return <div>loading...</div>
    }
    return <div 
    style={{marginTop: 90}}
    >
        <CourseCard course={course} 
        // purchasedCourses={purchasedCourses}
        />
    </div>
}

function CourseCard({ course }){
    const [purchasedCourses, setPurchasedCourses] = useRecoilState(purchasedCoursesState);
    
    const handlePurchasing = () => {
        fetch("https://localhost:4000/user/courses/"+course._id, {
            method: "POST",
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem("token")
            }
        }).then((res)=> {
            res.json().then((data) => {
                // setPurchasedCourses([...purchasedCourses, course._id]);
                // setPurchasedCourses((prevPurchasedCourses) => [...prevPurchasedCourses, course._id]);
                // console.log("Purchased courses alu :", purchasedCourses); 
                console.log('handle purchase call hua ')
                if (!purchasedCourses.includes(course._id)) {
                    setPurchasedCourses((prevPurchasedCourses) => [...prevPurchasedCourses, course._id]);
                    console.log("Purchased courses alu :", purchasedCourses); 
                }
            })
        })
    }

    // useEffect(() => {
    //     if (purchasedCourses.includes(course._id)) {
    //         handlePurchasing();
    //     }
    //     console.log("Purchased courses tamatatar:", purchasedCourses);
    // }, []);

    return (
        <div style={{display: "flex", justifyContent: "space-evenly" , marginTop: -20}}>
         <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
            <img src={course.imageLink} style={{display: "flex", margin:"auto",width:290, height: 150, borderRadius:10 }}></img>
        <Typography textAlign={"center"} variant={"h3"}><p style={{fontSize: "28px"}}>{course.title}</p></Typography>
        <Typography textAlign={"center"} ><p style={{marginTop:-5, fontSize: "16px"}}>{course.description}</p></Typography> 

        { purchasedCourses.includes(course._id) ? (           
            <Typography textAlign={"center"}><Button style={{borderRadius: 20}} variant="contained"
            >PURCHASED</Button></Typography>
        ) : (
            <div>
               <Link to={`/course/${course._id}/payment`}>
             <Typography textAlign={"center"}>
                <Button style={{borderRadius: 20}} variant="contained"
                onClick={handlePurchasing}
            >BUY @ ${course.price}</Button></Typography>   
            </Link>
           
            </div>           
        )}
        </div>

        <div>
        <Card 
        variant="outlined" style = {{

            width: 270,
            minHeight: 380,
            padding: 10,
            border: "2px solid black",
            borderRadius:20,
            color: "white",
            background: "#1976D2"}}>
        <Typography textAlign={"center"} variant={"h4"} style={{fontSize: "18px", marginTop: 5}}>Program Description
        <div style={{ display: "flex" , flexDirection :"column",marginLeft: 18 ,height: 300, width: 230, background: "white", color: "black", borderRadius: 20, marginTop : 15, gap: "5px"}}>
           <span style={{marginTop: 20}}>😎 Beginner to Pro</span>
           <span>📽 20+ Hours of content</span> 
           <span>✔ 150+ Lessons</span> 
           <span>📲 Recorded videos</span> 
           <span>🧾 English Captions</span> 
           <span>🎓 Certification</span> 
           <span>🤝 1 year access</span> 

        </div>
        </Typography>
        </Card>    
        </div>    
    </div>
    )
}


export default CourseDetails;