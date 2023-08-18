const express = require('express');
const {Course, Admin} = require('../database/index');
const jwt = require('jsonwebtoken');
const {secret} = require('../middleware/auth');
const {authenticateJwt} = require('../middleware/auth');
const z = require('zod')
const router = express.Router();


let signupProps = z.object({
  username : z.string().min(1).max(50).email(),
  password : z.string().min(8).max(50)
})


router.post('/signup', async (req, res) => {
    // logic to sign up admin
    const parsedInput = signupProps.safeParse(req.body);
    if(!parsedInput.success){
     return res.status(411).json({message: parsedInput.error})
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;

    const admin = await Admin.findOne({username});
    if(admin){
      res.status(403).json({message : 'admin exist already dont need to signup'})
    }else{
      // we need to save this admin into db 
      const obj = {username : username , password : password};
      const newAdmin = Admin(obj);
      newAdmin.save();
      const token = jwt.sign({username , role : admin}, secret, {expiresIn : '1h'})
      res.json({message : 'admin created successfully', token})
    }
  });
  
  router.post('/login', async (req, res) => {
    // logic to log in admin
    const parsedInput = signupProps.safeParse(req.body);
    if(!parsedInput.success){
     return res.status(411).json({message: parsedInput.error})
    }
    const username = parsedInput.data.username;
    const password = parsedInput.data.password;
    
    const admin = await Admin.findOne({username, password});
    if(admin){
      const token =  jwt.sign({username, role :'Admin'}, secret, {expiresIn : '1h'})
      res.json({message : 'Logged in successfully' , token})
    }else{
      res.status(403).json({message : 'login failed due to invalid username or password '})
    }
  });

  router.get('/me',authenticateJwt, (req, res) => {
    res.json({
      username : req.user.username,
      message : "getting your email"
    })
  })

  router.get('/course/:courseId', authenticateJwt, async (req, res)=>{
    const course = await Course.findById(req.params.courseId);  
    res.json({course});
  })
  
  router.post('/courses',authenticateJwt, async (req, res) => {
    // logic to create a course
    const course = new Course(req.body);
    await course.save();
    res.json({message: 'Course created successfully', courseId: course.id})
  });
  
  router.put('/courses/:courseId',authenticateJwt, async  (req, res) => {
    // logic to edit a course
   const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new : true});
   if(course){
      res.json({message : 'course updated successfully'})
   }else{
      res.status(404).json({message : 'course not found'})
   }
  
  });
  
  router.get('/courses',authenticateJwt, async(req, res) => {
    // logic to get all courses
    const courses = await Course.find({});
    res.json({ courses })
  });

  router.delete('/courses/:courseId', authenticateJwt, async(req, res) => {
  const course = await Course.findById(req.params.courseId)
  if(course) {
    const deleted = await Course.findByIdAndDelete(req.params.courseId);
    if(deleted){     
        res.json({ message: 'Course deleted successfully' });
     } else {
        res.json({ message: 'course may be deleted already' });
      }
    }
    else{
      res.json({message : 'course not found'})
    }
    
  })
  

module.exports =router;