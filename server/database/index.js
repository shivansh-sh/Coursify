const mongoose = require('mongoose')

// defining mongoose schema thinks of it as the shape that we need to store for now 
const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    purchasedCourses : [{type : mongoose.Schema.Types.ObjectId , ref : 'Course'}]
  })
  
  const courseSchema = new mongoose.Schema({
    title: String, 
    description: String, 
    price: Number, 
    imageLink: String, 
    published: Boolean
  })
  
  const adminSchema = new mongoose.Schema({
    username : String,
    password : String
  })
  
  // defining mongoose models 
  const Course = mongoose.model('Course' , courseSchema);
  const Admin = mongoose.model('Admin', adminSchema);
  const User = mongoose.model('User', userSchema)

  module.exports = {
    User,
    Admin,
    Course
  };
  
 
  