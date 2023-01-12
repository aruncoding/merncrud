import  express  from "express";
import cors from 'cors';
import connectDB from "./config/connectdb.js";
import CandidateRoutes from './routes/candidateRoutes.js';
import upload from "./middlewares/upload-middleware.js";
import dotenv from 'dotenv';
dotenv.config()


// First Step--> create object of express which we inported above 
const app = express()

// Second Step afer creating .env file and defining port number--> Defining port number on which serever is running
const port = process.env.PORT

// Third Step-->To run the server write below code
app.listen(port, () => {
    console.log(`Server Listening at http://127.0.0.1:${port}`)
})

//Fourth Step --> Defning Cors Policy
app.use(cors())

//Fifth Step --> connect database
const DATABASE_URL = process.env.DATABASE_URL

//For Parsing application/json
app.use(express.json())

//Sixth Step --> call the function and pass DATABASE_URL to that function which we created ion cofig/connectdb.js file
connectDB(DATABASE_URL)

// To Access image File Store in the folder which use uploaded 
app.use(express.static('public/uploads/pimage'))

// To Access Doc File Store in the folder which use uploaded 
// app.use(express.static('public/uploads/pimage'))

// Load Routes
app.use('/api', CandidateRoutes)

// Application Level Middleware - For Parsing multipart/form-data
// app.use(upload.fields([{ name: 'pimage', maxCount: 1 }, { name: 'rdoc', maxCount: 1 }]))
