import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { purchasedCoursesState } from "../atom/recoilState";
import {useRecoilState} from 'recoil';

function PurchasedCourses(){
    const [isLoading, setIsLoading] = useState(true); // To track loading state

    const [purchasedCourses, setPurchasedCourses] = useRecoilState(purchasedCoursesState);
    useEffect(() => {
        fetch("https://localhost:4000/user/purchasedCourses", {
            method: "GET",
            headers: {
                "Authorization" : "Bearer "+localStorage.getItem("token") 
            }
        }).then((res)=> {
            res.json().then((data) => {
                setPurchasedCourses(data.purchasedCourses);
                // console.log('itne hen ',purchasedCourses)
                setIsLoading(false); // Set loading state to false
            })
        })
        .catch((error) => {
            console.error("Error fetching purchased courses:", error);
            setIsLoading(false); // Set loading state to false even on error
        });
    }, [setPurchasedCourses])

    return <div>
        <h3 style={{display: "flex", fontFamily: "Rubik", fontSize: 42, justifyContent: "center"}}>All Purchased<div style={{color: "rgb(25, 118, 210)", marginLeft: 10}}>Courses</div></h3>
        <div style={{display: "flex", justifyContent:"center", flexWrap: "wrap"}}>   { purchasedCourses.length > 0 ?(
             purchasedCourses.map((course) =>(
                <div 
                 key={course._id}>
                    <Card variant="outlined" style = {{
                        width: 270,
                        minHeight: 200,
                        padding: 5,
                        margin: 10
                    }} 
                    >
                            <img src={course.imageLink} style={{display: "flex", margin:"auto",width:270, height: 160, }}></img>
                        <Typography textAlign={"center"} variant={"h6"}><p style={{fontSize: "18px", margin:2}}>{course.title}</p></Typography>
                        
                        <Typography textAlign={"center"}><p style={{margin:1}}>{course.description}</p></Typography>   
                        </Card>
                </div>
            ))
        ) : (
    
            <Typography textAlign={"center"} ><p style={{ fontSize: "19px"}}>You have not purchased any courses yet !!</p></Typography> 
        )
        }</div>
     
    </div>
}

export default PurchasedCourses;