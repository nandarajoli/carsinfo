const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var serviceAccount = require("./key.json");
initializeApp({
  credential: cert(serviceAccount)
});
var express = require('express');
const app = express();
const bodyParser =require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
const db = getFirestore();
var express = require('express');
app.use(express.static('public'));
var passwordHash = require('password-hash');
app.get('/', function (req, res) {  
res.sendFile( __dirname + "/public/" + "signup.html" );
})  
app.get('/login', function (req, res) {  
    res.sendFile( __dirname + "/public/" + "login.html" );
    })  
 
app.get('/signup', function (req, res) {  
    res.sendFile( __dirname + "/public/" + "signup.html" );
    })
app.post('/signupsubmit', function (req, res) {  
  console.log(req.body);
  db.collection('usersdata')
  .where("email","==",req.body.email)
  .get()
  .then((docs) => {
    if(docs.size>0){
      res.send("<h1>account already exists with this email</h1><br><br><br><h2>Please <a herf='/login'>login</a></h2><br><h2>Or Try Again With Another Email</h2>");
    }
    else{
   db.collection('usersdata').add({
     name:req.body.name,
     email:req.body.email,
     password:passwordHash.generate(req.body.password)
 }).then(() =>{
  res.sendFile( __dirname + "/public/" + "login.html" );
 })
}
})
 })
  app.post('/loginsubmit', function (req, res) {  
  console.log(req.body.email)
  db.collection('usersdata')
  .where("email","==",req.body.email)
  .get()
  .then((docs) => {
    var verified = false;
    docs.forEach((doc) => {
      verified = passwordHash.verify(req.body.password, doc.data().password)
    });
      console.log(docs.size)
      if(verified){
        res.sendFile(__dirname + "/public/" + "cars.html");
      }
      else{
        res.send("<h1>please signup first </h1>")
      }
    })
  })
app.listen(3000, function () {  
console.log('Example app listening on port 3000!')  
})