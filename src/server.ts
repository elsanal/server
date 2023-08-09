import mongoose from "mongoose";
import express from "express";
import dotenv from 'dotenv';
import projectRoutes from './routes/projectRoutes'
import aboutRoutes from './routes/aboutRoutes'
import serviceRoutes from './routes/serviceRoutes'
import resumeRoutes from './routes/resumeRoutes'
import cors from "cors";
import morgan from "morgan";



dotenv.config()
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors({ origin: '*'}));
app.use(morgan('dev'))
app.use('/api', projectRoutes)
app.use('/api', aboutRoutes)
app.use('/api', serviceRoutes)
app.use('/api', resumeRoutes)

// Connecting to database
async function connect_to_database(){
    const options = {dbName:"Portfolio"}
    mongoose.set('strictQuery', true);
    await mongoose.connect(`${process.env.MONGO_DB_URI}`, options)
    .then(() => console.log("Connected to Mongo DB"))
    .catch((err: any) => console.error("Unable to connect to database...", err))
  }

connect_to_database()
const port = process.env.PORT || 3333;
const server = app.listen(port, () => console.log(`listening on port ${port}`));
server.on('error', (err: any) => console.log(err));

