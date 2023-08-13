import express, { Router, Request, Response } from 'express';
import {serviceCollection} from '../data/models';

const serviceRouter: Router = express.Router();

///////////////////////// GET METHODS //////////////////////////
serviceRouter.get('/service', async(req: Request, res: Response) => {
    try {
      const Docs = await serviceCollection.find({});
      res.setHeader('Content-Range', `bytes 0-${Docs.length - 1}/${Docs.length}`);
      res.setHeader('Accept-Range', 'bytes');
      res.send(Docs).status(200)
    } catch (error) {
      res.status(500).json({ message: 'Error fetching data' });
      console.error("Error featching data : ",error);
    }
  });

serviceRouter.get('/service/:id', async(req: Request, res: Response, next) => {
  try {
    const Docs = await serviceCollection.findOne({ _id: req.params.id})
    res.send(Docs).status(200)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
    console.error("Error featching data : ",error);
  }
});

////////////////////////// POST && UPDATE ////////////////////////////////////
serviceRouter.post('/service', async (req: Request, res: Response) => {
  try {
    console.log("Start posting {'/service'}")
    const proj = new serviceCollection(req.body);
    await proj.save(); 
    res.send("Ok").status(200)
  } catch (err) {
    console.error('Error creating post', err);
    res.status(500).json({ error: 'Error creating post' });
  }
});

serviceRouter.patch('/service/:id', async (req: Request, res: Response) => {
  try {
    await serviceCollection
    .findOneAndUpdate({id:req.params.id}, req.body); 
    res.send("OK").status(200)
  } catch (err) {
    console.error('Error updating post', err);
    res.status(500).json({ error: 'Error updating post' });
  }
});

////////////////////// DELETE METHOD //////////////////////////////////
serviceRouter.delete('/service/:id', async (req: Request, res: Response) => {
  try {
    await serviceCollection.findOneAndDelete({});
    res.send("OK").status(200)
  } catch (err) {
    console.error('Error deleting doc', err);
    res.status(500).json({ error: 'Error updating post' });
  }
});

serviceRouter.delete('/service/:?range=0-9&sort=id%2CASC', async (req: Request, res: Response) => {
  try {
    await serviceCollection.findOneAndDelete({});
    res.send("OK").status(200)
  } catch (err) {
    console.error('Error deleting doc', err);
    res.status(500).json({ error: 'Error updating post' });
  }
});
  
export default serviceRouter;