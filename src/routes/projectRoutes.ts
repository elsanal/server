import express, { Router, Request, Response } from 'express';
import {projectCollection} from '../data/models';

const projectRouter: Router = express.Router();
projectRouter.get('/project', async(req: Request, res: Response) => {
    // Use mongoose to query the database
    console.log("Start getting {'/api/project'}")
    const Docs = await projectCollection.find({});
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

projectRouter.get(`/project/:id`, async(req: Request, res: Response, next) => {
  // Use mongoose to query the database
  console.log("Start getting {'/project/:id'}")
  const Docs = await projectCollection.findOne({ _id: req.params.id})
  try {
    res.send(Docs);
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// // Define the API endpoint to create a user
projectRouter.post('/project', async (req: Request, res: Response) => {
  try {
    console.log("Start posting {'/project'}")
    const proj = new projectCollection(req.body); // create a new User instance with the request body
    await proj.save(); 
    res.send(req.body).status(200)// save the user to the database
   // return the created user
  } catch (err) {
    console.error('Error creating user', err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

projectRouter.put('/project/:id', async (req: Request, res: Response) => {
  try {
    console.log("Start putting {'/project/:id'}")
    await projectCollection
    .findOneAndUpdate({_id:req.body.id}, req.body); // create a new User instance with the request body
    res.send(req.body).status(200)// save the user to the database
    console.log(req.body); // return the created user
  } catch (err) {
    console.error('Error creating user', err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

projectRouter.patch('/project/:id', async (req: Request, res: Response) => {
  try {
    console.log("Start putting {'/project/:id'}")
    await projectCollection
    .findOneAndUpdate({_id:req.body.id}, req.body); // create a new User instance with the request body
    res.send(req.body).status(200)// save the user to the database
    console.log(req.body); // return the created user
  } catch (err) {
    console.error('Error creating user', err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

projectRouter.delete('/project', async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    await projectCollection.findOneAndDelete({});
    res.send().status(200)// save the user to the database
    console.log("Document deleted.")
  } catch (err) {
    console.error('Error deleting doc', err);
  }
});

projectRouter.delete('/project/:id', async (req: Request, res: Response) => {
  try {
    console.log("Start deleting")
    await projectCollection.findOneAndDelete({});
    res.send().status(200)// save the user to the database
    console.log("Document deleted.")
  } catch (err) {
    console.error('Error deleting doc', err);
  }
});

projectRouter.get('/project/:?range=0-9&sort=id%2CASC', async (req: Request, res: Response) => {
  try {
    console.log("Start deleting {/project?}")
    await projectCollection.findOneAndDelete({});
    res.send().status(200)// save the user to the database
    console.log("Document deleted.")
  } catch (err) {
    console.error('Error deleting doc', err);
  }
});  
export default projectRouter;