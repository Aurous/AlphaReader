import fs from 'fs';
import express from 'express';
import Requests from './api/Requests/index.mjs';
import https from 'https';
import http from 'http';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
app.use(helmet());
app.use(cors({
	origin: (origin, callback) => {
		if(!origin) return callback(null, true);
		if(['http://localhost:19006'].indexOf(origin) === -1){
			return callback(new Error("CORS Polocy Error"), false);
		}
		return callback(null, true);
	}
}));

app.get('/search/:source', async(req, res) => {
	console.log(req.ip, " - search - ", req.params, " - ", req.query);
  try{
    const { source } = req.params;
    const manga = new Requests(source);
    const results = await manga.search(req.query);
    res.json(results);
  }catch(err){
    console.log("Error", err);
    res.status(400).send(String(err));
  }
});

app.get('/chapters/:source/:uri', async (req, res) => {
	console.log(req.ip, " - chapters - ", req.params, " - ", req.query);
  try{
    const { source, uri } = req.params;
    const manga = new Requests(source);
    const results = await manga.chapters(uri);
    res.json(results);
  }catch(err){
    console.log("Error", err);
    res.status(400).send(String(err));
  }
});

app.get('/pages/:source/:uri/:chapter', async (req, res) => {
	console.log(req.ip, " - pages - ", req.params, " - ", req.query);
  try{
    const { source, uri, chapter } = req.params;
    const manga = new Requests(source);
    const results = await manga.pages(uri, chapter);
    res.json(results);
  }catch(err){
    console.log("Error", err);
    res.status(400).send(String(err));
  }
});

app.get('/page/:source/:uri/:chapter/:page', async (req, res) => {
	console.log(req.ip, " - page - ", req.params, " - ", req.query);
  try{
    const { source, uri, chapter, page } = req.params;
    const manga = new Requests(source);
    const results = await manga.page(uri, chapter, page);
    res.json(results);
  }catch(err){
    console.log("Error", err);
    res.status(400).send(String(err));
  }
});

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3000;

if(env === 'production'){
	const credentials = {
		key: fs.readFileSync('/etc/letsencrypt/live/manga.ryanhill.com/privkey.pem', 'utf8'),
		cert: fs.readFileSync('/etc/letsencrypt/live/manga.ryanhill.com/cert.pem', 'utf8'),
		ca: fs.readFileSync('/etc/letsencrypt/live/manga.ryanhill.com/chain.pem', 'utf8')
	};
	const httpsServer = https.createServer(credentials, app).listen(port, () => {
  	console.log("AlphaReader Api listening at https://%s:%s", httpsServer.address().address, httpsServer.address().port)
	});
}else{
	const httpServer = http.createServer(app).listen(port, () => {
	  console.log("AlphaReader Api listening at http://%s:%s", httpServer.address().address, httpServer.address().port)
	});
}
