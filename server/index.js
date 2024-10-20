const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cors = require("cors");
const app = express();

dotenv.config({ path: './config.env'});
require('./db/conn');
// const Customer = require('./model/CustomerSchema');
// const Transfer = require('./model/TransferSchema');

// const corsOptions = {
//     origin: "https://bankingwebsite-1.onrender.com",
//     methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//     credentials: true,
//   };
  
//   app.use(cors(corsOptions));
app.use(express.json());

app.use(require('./router/auth'));



const PORT = process.env.PORT;

// app.get('/',(req,res) =>{
//     res.send(`Hello world from server`);
// })


app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
})
// console.log("Hello");