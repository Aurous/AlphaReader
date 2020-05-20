import express from 'express';
import Requests from './api/Requests/index.mjs';
import helmet from 'helmet';

const app = express();
app.use(helmet());

app.get('/search/:source', async(req, res) => {
  try{
    const { source } = req.params;
    const manga = new Requests(source);
    const results = await manga.search(req.query);
    res.json(results);
  }catch(err){
    console.log("Error", err);
    res.status(400).send(String(err));
  }
})

app.get('/chapters/:source/:uri', async (req, res) => {
  try{
    const { source, uri } = req.params;
    const manga = new Requests(source);
    const results = await manga.chapters(uri);
    res.json(results);
  }catch(err){
    console.log("Error", err);
    res.status(400).send(String(err));
  }
})

app.get('/pages/:source/:uri/:chapter', async (req, res) => {
  try{
    const { source, uri, chapter } = req.params;
    const manga = new Requests(source);
    const results = await manga.pages(uri, chapter);
    res.json(results);
  }catch(err){
    console.log("Error", err);
    res.status(400).send(String(err));
  }
})


app.get('/page/:source/:uri/:chapter/:page', async (req, res) => {
  try{
    const { source, uri, chapter, page } = req.params;
    const manga = new Requests(source);
    const results = await manga.page(uri, chapter, page);
    res.json(results);
  }catch(err){
    console.log("Error", err);
    res.status(400).send(String(err));
  }
})

let server = app.listen(8081, function () {
   let host = server.address().address
   let port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
