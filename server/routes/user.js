const express = require('express');
const {Course, User} = require('../database/index');
const jwt = require('jsonwebtoken');
const {secret} = require('../middleware/auth');
const {authenticateJwt} = require('../middleware/auth');
require('dotenv').config();
const stripe = require("stripe")(process.env.SECRET_KEY);
const z = require('zod');
const router = express.Router();

const signupProps = z.object({
  username : z.string().min(1).max(50).email(),
  password : z.string().min(8).max(50)
})

router.post('/signup', async (req, res) => {
    // logic to sign up user
    const parsedInput = signupProps.safeParse(req.body);
    if(!parsedInput.success){
      return res.status(411).json({message : parsedInput.error})
    }

    const username = parsedInput.data.username;
    const password = parsedInput.data.password;

    const user = await User.findOne({username});
    if(user){
      res.status(403).json({message : ' user already exist dont need to signup  '})
    }else{
        const obj = {username : username , password : password};
        const newUser = new User(obj);
        // you need to save that user in db
        newUser.save();
        const token = jwt.sign({username , role : 'user'}, secret , {expiresIn : '1h'})
        res.json({ message: 'User created successfully', token });
    }
  });
  
  router.post('/login', async(req, res) => {
    // logic to log in user
    const parsedInput = signupProps.safeParse(req.body);
    if(!parsedInput.success){
      return res.status(411).json({message : parsedInput.error})
    }

    const username = parsedInput.data.username;
    const password = parsedInput.data.password;
    const user = await User.findOne({username, password});
    if(user){
      const token = jwt.sign({username , role : 'user'}, secret, {expiresIn : '1h'});
      res.json({message : 'Logged in successfully', token})
    }else{
      res.status(403).json({message : 'invalid username or password'})
    }
  });

  // logic to get useremail on appbar 
  router.get('/me',authenticateJwt, (req, res) => {
    res.json({
      username : req.user.username,
      message : "getting your email"
    })
  })
  
  router.get('/courses', authenticateJwt, async(req, res) => {
    // logic to list all courses
    const courses = await Course.find({ published : true});
    res.json({ courses });
  });
  // logic to get a specific course 
  router.get('/course/:courseId', authenticateJwt, async(req, res) => {
    const course = await Course.findById(req.params.courseId);
    res.json({course});
  })

  router.post('/courses/:courseId', authenticateJwt, async(req, res) => {
     // logic to purchase a course
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if(course){
      // find the user
      const user = await User.findOne({username : req.user.username})
      if(user){
        user.purchasedCourses.push(course); // user in which purchasedCourse property changes so we needtosaveit
        await user.save()
        res.json({ message: 'Course purchased successfully'})
      }else{
        res.status(403).json({message : 'could not find the user'});
      }
    }else{
      res.status(404).json({message : 'could not find the course'})
    }
  });
  
  router.get('/purchasedCourses', authenticateJwt, async (req, res) => {
    // logic to view purchased courses
    const user = await User.findOne({username : req.user.username}).populate('purchasedCourses')
    if(user){
      res.json({purchasedCourses : user.purchasedCourses})
    }else{
      res.status(403).json({message : 'user not found'})
    }
    
  });
 // payment logic 

 router.post('/paymentpage', async(req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await stripe.charges.create({
      source: token.id,
      amount,
      currency: 'usd',
    });
    status = 'success';
  } catch (error) {
    console.log(error);
    status = 'Failure';
  }
  res.json({ error, status });
});

    module.exports = router;