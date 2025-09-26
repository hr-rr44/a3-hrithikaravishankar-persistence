const express = require( 'express' );
const mongoose = require("mongoose");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const mime = require("mime");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// models
const User = require("./models/User");
const Item = require("./models/Item");

//connecting to mongodb
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
.then(() => console.log("connected to mongodb!"))
.catch(err => console.log("Oops... there is a database error:", err));

// Middleware

/* app.use( express.static( 'public' ) );
app.use( express.static( 'views'  ) );
app.use( express.json() ); */

// serve static files (CSS, JS, HTML in /public)
app.use(express.static(path.join(__dirname, "public")));
app.use( express.json()) // parsing

//sessions stored in mongodb
app.use(session({

}))


let groceryList = []

// ---------------------
// ------ Routes ------
// ---------------------

// GET "/" --> show login page unless logged in
app.get("/", (req, res) => {
  if (req.session.userId) return res.redirect("/app");
  res.sendFile(path.join(__dirname, "public", "login.html"));  
});

// GET "/app" --> main grocery app (requires login)
app.get("/app", (req, res) => {

});

// POST "/login" --> create account if new user; otherwise check password


// POST "/logout" --> clear session


// ---------------------
// ------ END ------
// ---------------------

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
    //added smth here
  }else if( request.method === "POST" && request.url === "/submit"){
    handlePost( request, response ) 
  }else if( request.method === "POST" && request.url === "/delete"){
    handleDelete(request, response)
  }

})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    // console.log( JSON.parse( dataString ) )
    const incoming = JSON.parse(dataString)

    // ... do something with the data here!!!
    // will calculate how many days till expiration
    const now = new Date()
    const expDate = new Date(incoming.expirationDate)
    // number of milliseconds in a full day
    const msPerDay = 1000 * 60 * 60 * 24
    const daysUntilExpiration = Math.ceil((expDate - now) / msPerDay)

    // creates new object that includes all fields from 'incoming'
    const groceryItemWithExpiry = {
      ...incoming, daysUntilExpiration
    }

    // add new item to groceryList array
    groceryList.push(groceryItemWithExpiry)

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    // response.end("test")
    response.end(JSON.stringify(groceryList))
  })
}

const handleDelete = function(request, response) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    const incoming = JSON.parse(dataString)
    const index = incoming.index

    // need to check index and see if item is valid before deleting
    if (typeof index == "number" && index >= 0 && index < groceryList.length) {
      groceryList.splice(index, 1)
    }

    response.writeHead( 200, {"Content-Type": "application/json" })
    // response.end("test")
    response.end(JSON.stringify(groceryList))
  
  })

}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

server.listen( process.env.PORT || port )
