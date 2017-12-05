/* const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const Router = require('router');
// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`)); */


var express=require('express');
app = module.exports = express();

//var app=express();
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

var MongoClient = mongodb.MongoClient;


var url = 'mongodb://localhost:27017/HotelDB';
var MongoClient = require('mongodb').MongoClient;

//Added to resolve the cross domain issue while connecting from Angular (localhost:9000) to the current port (localhost:3000)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/Hotel',function(req,res){
   // console.log("Query parms:"+req.query.searchString+" "+req.query.limit);

   // console.log("==============:"+req.body.searchString);
    
    MongoClient.connect(url,function(error,db){
        //db.hotellist.find( { $text: { $search: "518002" } } );
        if(error){
            console.log("While Connection"+error);
            
        }else{
            db.collection("Hotel").find().toArray(function(err,result){
                if(err) 
                {
                    console.log(err);
                }else{
                    //console.log(result);
                    res.send(result);
                }
               
            });
        }
   
    });
});

app.post('/saveHotel',function(req,res){
    //console.log("In SaveHotel:"+req.body.username);
         MongoClient.connect(url,function(error,db){
            if(error){
                console.log("Error Connecting:"+error);
                
            }else{
                db.collection("customer").insert({"username":req.body.username,"useraddress":req.body.useraddress,
                "userlocation":req.body.userlocation,"zip":req.body.zip,"hotelid":req.body.hotelid}
            );
                res.send({success:true});
            }
         
        }); 
    });
app.get('/getHotel',function(req,res){
//console.log("In GetHotel:"+req.query.id);
    MongoClient.connect(url,function(error,db){
        if(error){
            console.log("Error Connecting:"+error);
            
        }else{
            db.collection("hotellist").find({_id:parseInt(req.query.id)}).toArray(function(err,result){
                if(err){
                    console.log("Error:"+err);
                }else{
                    //console.log("Final GetHotel:"+result);
                    res.send(result);
                    
                }
            });
        }
     
    });
});

app.listen(3000,function(){
console.log("Listening on 3000");
});
