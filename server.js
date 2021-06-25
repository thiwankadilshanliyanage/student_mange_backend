const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyparser.json());

mongoose.connect("mongodb+srv://dbThiwanka:Thiwanka1022@@cluster0.oanp3.mongodb.net/mydb?retryWrites=true&w=majority",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
});

const connection = mongoose.connection;
connection.once("open",() => {
    console.log("mongodb Connection Successful");
})

const studentRouter = require("./routes/students.js");
app.use("/student",studentRouter);

app.listen(PORT,()=>{
    console.log(`server is up and running on port number: ${PORT}`) 
})