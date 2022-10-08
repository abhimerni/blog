require("dotenv").config();
const express = require("express");
const app = express();
const indexRoute = require('./src/route/index')
const cors = require('cors');
const connectDB = require("./src/config/db");
const fileUpload = require('express-fileupload')

connectDB()
  
app.use(cors())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ extended:true}))
app.use(fileUpload({ useTempFiles:true}))

// app.use((req, res, next)=>{
//   console.log(`Method : ${req.method} | url : ${req.url} `);
//   next()
// })

app.use('/api/v1', indexRoute)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` server is running on ${PORT}`);
});