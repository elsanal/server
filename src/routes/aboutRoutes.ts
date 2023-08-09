import express, { Router, Request, Response } from 'express';
import {aboutCollection} from '../data/models';

const aboutRouter: Router = express.Router();
// router.use('/about', raExpressMongoose(aboutCollection, { q: ['id']}));
aboutRouter.get('/about', async(req: Request, res: Response) => {
    // Use mongoose to query the database
    console.log("Start getting {'/about'}")
    const Docs = await aboutCollection.find({});
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


aboutRouter.get('/about/:id', async(req: Request, res: Response, next) => {
  // Use mongoose to query the database
  console.log("Start getting {'/about/:id'}")
  const Docs = await aboutCollection.findOne({ _id: req.params.id})
  try {
    res.send(Docs);
    res.status(200);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// // Define the API endpoint to create a user
aboutRouter.post('/about', async (req: Request, res: Response) => {
  try {
    console.log("Start posting {'/about'}")
    const proj = new aboutCollection(req.body); // create a new User instance with the request body
    await proj.save(); 
    res.send("Ok").status(200)// save the user to the database
   // return the created user
  } catch (err) {
    console.error('Error creating user', err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

aboutRouter.patch('/about/:id', async (req: Request, res: Response) => {
  try {
    console.log("Start putting {'/about/:id'}")
    await aboutCollection
    .findOneAndUpdate({id:req.body.id}, req.body); // create a new User instance with the request body
    res.send("OK").status(200)// save the user to the database
  } catch (err) {
    console.error('Error creating user', err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

aboutRouter.delete('/about', async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    await aboutCollection.findOneAndDelete({});
    res.send().status(200)// save the user to the database
    console.log("Document deleted.")
  } catch (err) {
    console.error('Error deleting doc', err);
  }
});

aboutRouter.delete('/about/:id', async (req: Request, res: Response) => {
  try {
    console.log("Start deleting")
    await aboutCollection.findOneAndDelete({});
    res.send("Deleted").status(200)// save the user to the database
  } catch (err) {
    console.error('Error deleting doc', err);
  }
});

aboutRouter.get('/about/:?range=0-9&sort=id%2CASC', async (req: Request, res: Response) => {
  try {
    console.log("Start deleting {/about?}")
    await aboutCollection.findOneAndDelete({});
    res.send().status(200)// save the user to the database
    console.log("Document deleted.")
  } catch (err) {
    console.error('Error deleting doc', err);
  }
});  
export default aboutRouter;