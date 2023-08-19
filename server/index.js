const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const https = require('https');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user'); 
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;

require('./database/')


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', adminRouter);
app.use('/user', userRouter);

 
 const DB_CONNECT = "mongodb+srv://shivansh12345:shivansh12345@cluster0.li2m2af.mongodb.net/";

mongoose
  .connect(DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


const sslServer = https.createServer({
  key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
}, app)


sslServer.listen(PORT, ()=> console.log('secure server 😎 running on port ${PORT}'))
