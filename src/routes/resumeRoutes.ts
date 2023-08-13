import express, { Router, Request, Response } from 'express';
import {resumeCollection} from '../data/models';

const resumeRouter: Router = express.Router();

///////////////////////// GET METHODS //////////////////////////
resumeRouter.get('/resume', async(req: Request, res: Response) => {
    try {
      const Docs = await resumeCollection.find({});
      res.setHeader('Content-Range', `bytes 0-${Docs.length - 1}/${Docs.length}`);
      res.setHeader('Accept-Range', 'bytes');
      res.send(Docs).status(200)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
      console.error("Error featching data : ",error);
    }
  });

resumeRouter.get('/resume/:id', async(req: Request, res: Response, next) => {
  try {
    const Docs = await resumeCollection.findOne({ _id: req.params.id})
    res.send(Docs).status(200);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
    console.error("Error featching data : ",error);
  }
});

////////////////////////// POST && UPDATE ////////////////////////////////////
resumeRouter.post('/resume', async (req: Request, res: Response) => {
  try {
    console.log("Start posting {'/resume'}")
    const proj = new resumeCollection(req.body);
    await proj.save(); 
    res.send("Ok").status(200)
  } catch (err) {
    console.error('Error creating post', err);
    res.status(500).json({ error: 'Error creating post' });
  }
});

resumeRouter.patch('/resume/:id', async (req: Request, res: Response) => {
  try {
    await resumeCollection
    .findOneAndUpdate({id:req.params.id}, req.body); 
    res.send("OK").status(200)
  } catch (err) {
    console.error('Error updating post', err);
    res.status(500).json({ error: 'Error updating post' });
  }
});

////////////////////// DELETE METHOD //////////////////////////////////
resumeRouter.delete('/resume/:id', async (req: Request, res: Response) => {
  try {
    await resumeCollection.findOneAndDelete({});
    res.send("OK").status(200)
  } catch (err) {
    console.error('Error deleting doc', err);
    res.status(500).json({ error: 'Error updating post' });
  }
});

resumeRouter.delete('/resume/:?range=0-9&sort=id%2CASC', async (req: Request, res: Response) => {
  try {
    await resumeCollection.findOneAndDelete({});
    res.send("OK").status(200)
  } catch (err) {
    console.error('Error deleting doc', err);
    res.status(500).json({ error: 'Error updating post' });
  }
});
  
export default resumeRouter;