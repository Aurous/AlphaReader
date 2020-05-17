import _ from 'lodash';
import express from 'express';
import Requests from './api/Requests/index.mjs';
const app = express();

app.get('/', function (req, res) {
   res.send('Bleh');
})

app.get('/search/:source/:uri', async(req, res) => {
  try{
    const { uri, source } = req.params;
    const manga = new Requests(source);
    const results = await manga.search(uri, req.query);
    res.json(results);
  }catch(err){
    console.log("Error", err);
    res.sendStatus(400)
  }
})

app.get('/manga/:source/:uri', async (req, res) => {
  res.send(req);
})

app.get('/chapters/:source/:uri', async (req, res) => {
  res.send(req);
})


app.get('/page/:source/:uri', async (req, res) => {
  res.send(req);
})

let server = app.listen(8081, function () {
   let host = server.address().address
   let port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
