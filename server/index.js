const express = require('express'),
      app = express(),
      PORT = process.env.PORT || 3001;
      // Importing the router from index.js from /routes  
      todoRoutes = require('./routes/todos'),
      cors           = require("cors"),
      path = require("path");


// Body parser so we can parse .JSON
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Telling express to search '/views' for files without an explicit path
app.use(express.static(__dirname + '/views'));
//__dirname refers to the current directory

// Telling express to search 'public' for files without an explicit path. Public is an industry standard so is hard baked into express
app.use(express.static('public'));


// const corsOptions = {
//     origin: "http://localhost:3000",
//     optionsSuccessStatus: 300
//   }
  
//   app.use(cors(corsOptions))
app.use(cors());

// Home route
// app.get('/', (req, res) => {
//     // Sending a static file
//     res.sendFile('index.html')
// })

//Telling express to us the todoRoutes and add the line '/api/todos' to all requests from the router
app.use('/api/todos', todoRoutes);
// app.post('/api/todos', (req, res) => {
//     res.send("success");
// } )

// The section below is to serve React on heroku server
if (process.env.NODE_ENV === "production") {
    // Serve any static files
    app.use(express.static(path.resolve(__dirname, "../client/build")));
     // Handle React routing, return all requests to React app  
     app.get("*", function (req, res) {
      res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
     });
};

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});