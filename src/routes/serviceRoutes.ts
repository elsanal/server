"use client"
import express, { Router, Request, Response } from 'express';
import {serviceCollection} from '../data/models';

const serviceRouter: Router = express.Router();
serviceRouter.get('/service', async(req: Request, res: Response) => {
    // Use mongoose to query the database
    console.log("Start getting {'/service'}")
    const Docs = await serviceCollection.find({});
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

serviceRouter.get('/service/:id', async(req: Request, res: Response, next) => {
  // Use mongoose to query the database
  console.log("Start getting {'/service/:id'}")
  
  try {
    const Docs = await serviceCollection.findOne({ _id: req.params.id})
    res.send(Docs);
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// // Define the API endpoint to create a user
serviceRouter.post('/service', async (req: Request, res: Response) => {
  try {
    const proj = new serviceCollection(req.body); 
    await proj.save(); 
    res.send(req.body).status(200)
  } catch (err) {
    console.error('Error creating user', err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

serviceRouter.put('/service/:id', async (req: Request, res: Response) => {
  try {
    await serviceCollection
    .findOneAndUpdate({_id:req.body.id}, req.params); 
    res.send("OK").status(200);
  } catch (err) {
    res.status(500).json({ error: 'Error updating post' });
  }
});

serviceRouter.patch('/service/:id', async (req: Request, res: Response) => {
  try {
    await serviceCollection
    .findOneAndUpdate({id:req.params.id}, req.body);
    res.send("OK").status(200);
  } catch (err) {
    res.status(500).json({ error: 'Error updating post' });
  }
});

serviceRouter.delete('/service', async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    await serviceCollection.findOneAndDelete({});
    res.send().status(200)// save the user to the database
    console.log("Document deleted.")
  } catch (err) {
    console.error('Error deleting doc', err);
  }
});

serviceRouter.delete('/service/:id', async (req: Request, res: Response) => {
  try {
    console.log("Start deleting")
    await serviceCollection.findOneAndDelete({});
    res.send().status(200)// save the user to the database
    console.log("Document deleted.")
  } catch (err) {
    console.error('Error deleting doc', err);
  }
});

serviceRouter.get('/service/:?range=0-9&sort=id%2CASC', async (req: Request, res: Response) => {
  try {
    console.log("Start deleting {/service?}")
    await serviceCollection.findOneAndDelete({});
    res.send().status(200)// save the user to the database
    console.log("Document deleted.")
  } catch (err) {
    console.error('Error deleting doc', err);
  }
});  
export default serviceRouter;