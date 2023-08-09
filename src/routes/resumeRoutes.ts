import express, { Router, Request, Response } from 'express';
import {resumeCollection} from '../data/models';

const resumeRouter: Router = express.Router();
resumeRouter.get('/resume', async(req: Request, res: Response) => {
    // Use mongoose to query the database
    console.log("Start getting {'/resume'}")
    const Docs = await resumeCollection.find({});
    try {
      res.setHeader('Content-Range', `bytes 0-${Docs.length - 1}/${Docs.length}`);
      res.setHeader('Accept-Range', 'bytes');
      res.send(Docs);
      res.status(200);
    } catch (error) {
      console.log("There is an error")
      res.status(500).json({ message: 'Error fetching data' });
    }
  });

resumeRouter.get('/resume/:id', async(req: Request, res: Response, next) => {
  // Use mongoose to query the database
  console.log("Start getting {'/resume/:id'}")
  const Docs = await resumeCollection.findOne({ _id: req.params.id})
  try {
    res.send(Docs);
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// // Define the API endpoint to create a user
resumeRouter.post('/resume', async (req: Request, res: Response) => {
  try {
    console.log("Start posting {'/resume'}")
    const proj = new resumeCollection(req.body); // create a new User instance with the request body
    await proj.save(); 
    res.send(req.body).status(200)// save the user to the database
   // return the created user
  } catch (err) {
    console.error('Error creating user', err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

resumeRouter.put('/resume/:id', async (req: Request, res: Response) => {
  try {
    console.log("Start putting {'/resume/:id'}")
    await resumeCollection
    .findOneAndUpdate({_id:req.body._id}, req.body); // create a new User instance with the request body
    res.send(req.body).status(200)// save the user to the database
    console.log(req.body); // return the created user
  } catch (err) {
    console.error('Error creating user', err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

resumeRouter.delete('/resume', async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    await resumeCollection.findOneAndDelete({});
    res.send().status(200)// save the user to the database
    console.log("Document deleted.")
  } catch (err) {
    console.error('Error deleting doc', err);
  }
});

resumeRouter.delete('/resume/:id', async (req: Request, res: Response) => {
  try {
    console.log("Start deleting")
    await resumeCollection.findOneAndDelete({});
    res.send().status(200)// save the user to the database
    console.log("Document deleted.")
  } catch (err) {
    console.error('Error deleting doc', err);
  }
});

resumeRouter.get('/resume/:?range=0-9&sort=id%2CASC', async (req: Request, res: Response) => {
  try {
    console.log("Start deleting {/resume?}")
    await resumeCollection.findOneAndDelete({});
    res.send().status(200)// save the user to the database
    console.log("Document deleted.")
  } catch (err) {
    console.error('Error deleting doc', err);
  }
});  
export default resumeRouter;