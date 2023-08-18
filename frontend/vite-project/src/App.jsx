import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from "./components/Landing";
import CreateCourse from './components/CreateCourse';
import Register from './components/Register';
import Appbar from './components/Appbar';
import Course from './components/Course';
import ShowCourses from './components/Showcourses';




// This file shows how you can do routing in React.
// Try going to /login, /register, /about, /courses on the website and see how the html changes
// based on the route.
// You can also try going to /random and see what happens (a route that doesnt exist)
function App() {
    return (
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
                <Route path="/createcourses" element={<CreateCourse />} />
                <Route path="/showcourses" element={<ShowCourses />} />
                <Route path="/course/:courseId" element={<Course />} />
                




            </Routes>
        </Router>
        </div>
    );
}

export default App;