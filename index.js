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
app.use(bodyParser.text());

//my firestore database
const db02 = admin.firestore() ;


//get the image from the client and save it to firestore
var idcount = 14 ;
app.post('/imgapi' , (request,response) =>
{
    const data = request.body ;
    idcount++ ;
    data.idnum = idcount ;
    quickstartAddData(data,idcount) ;
}) ;

//save data to my firestore
async function quickstartAddData(sendthis,docname) {
  const docRef = db02.collection('autographer01').doc(`${docname}`);
  await docRef.set(sendthis);
}

//get the image from firestore and respond to client
app.get('/bringdb/:id', (request , response) => {
  var id = request.params.id ;
  quickstartListen(response,id);
  });

//read data from firestore
async function quickstartListen(res,id) {
  var idnum = idcount - parseFloat(id) ; 
  const snapshot = await db02.collection("autographer01").doc(`${idnum}`).get();
  //console.log(snapshot.data());
  res.json(snapshot.data());
}


//get the request from client for new love and then increment
//the love count in my firestore 
app.post('/sendlove' , (request,response) =>
{
  const lovecount = request.body ;
  const arr = lovecount.split(',');
  for (var m of arr){
    incre(m).catch(err =>{console.log('error in the lovecount string')});
  }
  response.end();
});

//incremental function firestore
async function incre(idnum){
const storyRef = db02.collection('autographer01').doc(`${idnum}`);
const res = await storyRef.update({ likecount: admin.firestore.FieldValue.increment(1) });
}

  

  
