import _ from 'lodash';
import express from 'express';
import Requests from './api/Requests/index.mjs';
const app = express();

app.get('/', function (req, res) {
   res.send('Bleh');
})

app.get('/search/:uri', async(req, res) => {
  console.log(req.params);
    const { uri } = req.params;
    if(uri){
      const manga = new Requests();
      const results = await manga.search(uri);
      console.log("exit 3", results);
      res.json(results);
    }else{
      res.sendStatus(500)
    }
})

app.get('/manga/:uri', async (req, res) => {
  res.send(req.params);
})

app.get('/chapters/:uri', async (req, res) => {
  res.send(req.params);
})


app.get('/page/:uri', async (req, res) => {
  res.send(req.params);
})

let server = app.listen(8081, function () {
   let host = server.address().address
   let port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
