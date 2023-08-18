import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { courseState, handlePurchasingState, purchasedCoursesState } from "../atom/recoilState";
import StripeCheckout from 'react-stripe-checkout';
const apiKey = import.meta.env.VITE_PUB_KEY;
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// const Message = ({ message }) => (
//   <section>
//     <p>{message}</p>
//   </section>
// );

export default function Payment() {
    const navigate = useNavigate();

  const { courseId } = useParams();
  const [course, setCourse] = useRecoilState(courseState);
  // const [handlePurchasing, setHandlePurchasing] = useRecoilState(handlePurchasingState);
  const [purchasedCourses, setPurchasedCourses] = useRecoilState(purchasedCoursesState);

  useEffect(() => {
    fetch("https://localhost:4000/user/course/"+courseId, {
        method: "GET",
        headers: {
            "Authorization" : "Bearer "+localStorage.getItem("token")
        }
    }).then((res)=> {
        res.json().then((data) => {
            console.log("hanji")
            setCourse(data.course)
            // setPurchased(data.purchasedCourses.map((course) => course._id))
        })
    });
  }, [])

//   useEffect(() => {
//     console.log("reached")
//     // Check to see if this is a redirect back from Checkout
//     const query = new URLSearchParams(window.location.search);

//     if (query.get("success")) {
//       setMessage("Order placed! You will receive an email confirmation.");
//       handlePurchasing();
//       setPurchasedCourses([...purchasedCourses, courseId]); // Update purchasedCourses state
//       navigate(`/coursedetails/${courseId}`)
//     }

//     if (query.get("canceled")) {
//       setMessage(
//         "Order canceled -- continue to shop around and checkout when you're ready."
//       );
//     }
//   }, [courseId, handlePurchasing, setCourse]);

const handleSuccess = () => {
    MySwal.fire({
      icon: 'success',
      title: 'Payment was successful',
      time: 4000,
    });
  };
  const handleFailure = () => {
    MySwal.fire({
      icon: 'error',
      title: 'Payment was not successful',
      time: 4000,
    });
  };

  const payNow = async token => {
    try {
        const response = await fetch('https://localhost:4000/user/paymentpage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: course.price * 100,
                token,
            }),
        });

        if (response.status === 200) {
            handleSuccess();
            // handlePurchasing();
            setPurchasedCourses([...purchasedCourses, courseId]); // Update purchasedCourses state
            navigate(`/coursedetails/${courseId}`)
        }
    } catch (error) {
        handleFailure();
        console.log(error);
    }
};


  return(
    <section style={{display: "flex", justifyContent:"center",marginTop: 80}}>
    <div>
      <img src={course.imageLink} />
      <div>
      <h3 style={{display: "flex", justifyContent:"center"}}>{course.title}</h3>
      <h5 style={{display: "flex", justifyContent:"center"}}>${course.price}</h5>
      </div>
    <div style={{display: "flex", justifyContent:"center"}}>
          <StripeCheckout
        stripeKey={apiKey}
        label="BUY"
        name="Pay With Card"
        billingAddress
        shippingAddress
        amount={course.price * 100}
        description={`Your total is $${course.price}`}
        token={payNow}
        />
        </div>
        </div>
  
  </section>
  );
}