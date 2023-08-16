import express, { Router, Request, Response } from 'express';
import {projectCollection} from '../data/models';

const projectRouter: Router = express.Router();

///////////////////////// GET METHODS //////////////////////////
projectRouter.get('/project', async(req: Request, res: Response) => {
    try {
      const Docs = await projectCollection.find({});
      res.setHeader('Content-Range', `bytes 0-${Docs.length - 1}/${Docs.length}`);
      res.setHeader('Accept-Range', 'bytes');
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'public, max-age=3600, max-stale=3600, stale-if-error=86400, must-revalidate');
      res.send(Docs).status(200)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
      console.error("Error featching data : ",error);
    }
  });

projectRouter.get('/project/:id', async(req: Request, res: Response, next) => {
  try {
    const Docs = await projectCollection.findOne({ _id: req.params.id})
    res.setHeader('Cache-Control', 'public, max-age=3600, max-stale=3600, stale-if-error=86400, must-revalidate');
    res.setHeader('Content-Type', 'application/json');
    res.send(Docs).status(200)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
    console.error("Error featching data : ",error);
  }
});

////////////////////////// POST && UPDATE ////////////////////////////////////
projectRouter.post('/project', async (req: Request, res: Response) => {
  try {
    console.log("Start posting {'/project'}")
    const proj = new projectCollection(req.body);
    await proj.save(); 
    res.send("Ok").status(200)
  } catch (err) {
    console.error('Error creating post', err);
    res.status(500).json({ error: 'Error creating post' });
  }
});

projectRouter.patch('/project/:id', async (req: Request, res: Response) => {
  try {
    await projectCollection
    .findOneAndUpdate({id:req.params.id}, req.body); 
    res.send("OK").status(200)
  } catch (err) {
    console.error('Error updating post', err);
    res.status(500).json({ error: 'Error updating post' });
  }
});

////////////////////// DELETE METHOD //////////////////////////////////
projectRouter.delete('/project/:id', async (req: Request, res: Response) => {
  try {
    await projectCollection.findOneAndDelete({});
    res.send("OK").status(200)
  } catch (err) {
    console.error('Error deleting doc', err);
    res.status(500).json({ error: 'Error updating post' });
  }
});

projectRouter.delete('/project/:?range=0-9&sort=id%2CASC', async (req: Request, res: Response) => {
  try {
    await projectCollection.findOneAndDelete({});
    res.send("OK").status(200)
  } catch (err) {
    console.error('Error deleting doc', err);
    res.status(500).json({ error: 'Error updating post' });
  }
});
  
export default projectRouter;