import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import Register from './components/Register';
import Appbar from './components/Appbar';
import ShowCourses from './components/ShowCourses';
import CourseDetails from './components/CourseDetails';
import PurchasedCourses from './components/PurchasedCourses';
import Payment from './components/Payment';
import {
    RecoilRoot,
  } from 'recoil';

function App() {
    return (
        <RecoilRoot>
        <div style={{
            // backgroundColor: "#eeeeee",
            height: "100vh",
            width: "100vw",
            
        }}>

        <Router>
            <Appbar />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/showcourses" element={<ShowCourses />} />
                <Route path="/purchasedcourses" element={<PurchasedCourses />} />
                <Route path="/course/:courseId/payment" element={<Payment/>} />
                <Route path='/coursedetails/:courseId' element={<CourseDetails/>}/>
                

            </Routes>
        </Router>
        </div>
        </RecoilRoot>
    );
}

export default App;