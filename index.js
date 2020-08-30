console.log('the bot is starting');

var express = require("express");
const app = express();
var admin = require('firebase-admin');

var serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://yamin-project-d9e12.firebaseio.com"
});

const port = process.env.PORT || 3000 ;
app.listen(port , ()=>{console.log('Starting in the port');});
app.use(express.static('public'));
app.use(express.json({limit : '1mb'}));

//body parser for getting any string as request for express
var bodyParser = require('body-parser');
const { response, request } = require("express");
app.use(bodyParser.text());

//my firestore database
const db02 = admin.firestore() ;

//get the image from the client and save it to firestore
var idcount = 0;
app.post('/imgapi' , (request,response) =>
{   const data = request.body ;
    idcount++ ;
    data.idnum = idcount ;
    console.log('idcount =',idcount);
    quickstartAddData(data,idcount) ;
}) ;

//save data to my firestore
async function quickstartAddData(sendthis,docname) {
  const docRef = db02.collection('autographer01').doc(`${docname}`);
  await docRef.set(sendthis);
}


app.get('/sendlove/:id' , (request,response) =>{
  const id = request.params.id ;
  incre(id).catch(err =>{console.log('error in the loveincre')});
  response.end();
});

app.get('/takelove/:id', (request,response) =>
{
  const id = request.params.id ;
  decre(id).catch(err =>{console.log('error in the lovedeccre')});
  response.end();
});

//incremental function firestore
async function incre(idnum){
const storyRef = db02.collection('autographer01').doc(`${idnum}`);
const res = await storyRef.update({ likecount: admin.firestore.FieldValue.increment(3)});
}

async function decre(idnum){
  const storyRef = db02.collection('autographer01').doc(`${idnum}`);
  const res = await storyRef.update({ likecount: admin.firestore.FieldValue.increment(-1)});
  }

var apikeys0 = require('./apikey');
app.get('/apikeys',(request,response)=>{
response.json(apikeys0);
});