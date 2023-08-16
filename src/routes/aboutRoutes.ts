import express, { Router, Request, Response } from 'express';
import {aboutCollection} from '../data/models';

const aboutRouter: Router = express.Router();

///////////////////////// GET METHODS //////////////////////////
aboutRouter.get('/about', async(req: Request, res: Response) => {
    try {
      const Docs = await aboutCollection.find({});
      res.setHeader('Content-Range', `bytes 0-${Docs.length - 1}/${Docs.length}`);
      res.setHeader('Accept-Range', 'bytes');
      res.setHeader('Cache-Control', 'public, max-age=3600, max-stale=3600, stale-if-error=86400, must-revalidate');
      res.setHeader('Content-Type', 'application/json');
      res.send(Docs).status(200)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
      console.error("Error featching data : ",error);
    }
  });

aboutRouter.get('/about/:id', async(req: Request, res: Response, next) => {
  try {
    const Docs = await aboutCollection.findOne({ _id: req.params.id})
    res.setHeader('Cache-Control', 'public, max-age=3600, max-stale=3600, stale-if-error=86400, must-revalidate');
    res.setHeader('Content-Type', 'application/json');
    res.send(Docs).status(200)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
    console.error("Error featching data : ",error);
  }
});

////////////////////////// POST && UPDATE ////////////////////////////////////
aboutRouter.post('/about', async (req: Request, res: Response) => {
  try {
    console.log("Start posting {'/about'}")
    const proj = new aboutCollection(req.body);
    await proj.save(); 
    res.send("Ok").status(200)
  } catch (err) {
    console.error('Error creating post', err);
    res.status(500).json({ error: 'Error creating post' });
  }
});

aboutRouter.patch('/about/:id', async (req: Request, res: Response) => {
  try {
    await aboutCollection
    .findOneAndUpdate({id:req.params.id}, req.body); 
    res.send("OK").status(200)
  } catch (err) {
    console.error('Error updating post', err);
    res.status(500).json({ error: 'Error updating post' });
  }
});

////////////////////// DELETE METHOD //////////////////////////////////
aboutRouter.delete('/about/:id', async (req: Request, res: Response) => {
  try {
    await aboutCollection.findOneAndDelete({});
    res.send("OK").status(200)
  } catch (err) {
    console.error('Error deleting doc', err);
    res.status(500).json({ error: 'Error updating post' });
  }
});

aboutRouter.delete('/about/:?range=0-9&sort=id%2CASC', async (req: Request, res: Response) => {
  try {
    await aboutCollection.findOneAndDelete({});
    res.send("OK").status(200)
  } catch (err) {
    console.error('Error deleting doc', err);
    res.status(500).json({ error: 'Error updating post' });
  }
});
  
export default aboutRouter;