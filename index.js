// This is the primary file for the api

// Dependencies
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const handlers = require('./lib/handlers.js');
const helpers = require('./lib/helpers.js');

// the server should respond to all requests with a string
//http server creation
let httpServer = http.createServer((req, res) => {
  Server(req, res);
});

//start the http server and have it listen on port 3000
httpServer.listen(3000, () => {
  console.log(`http server is listening on port 3000`);
});

//server function
const Server = (req, res) => {
  //get the url and parse it

  //get the path
  // const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
  //get the http method

  //get the query string as objects

  let buffer = '';
  // storing body data in buffer
  req.on('data', (data) => {
    buffer += data;
  });

  req.on('end', () => {
    //static files handling with /public route and also handle the content type of headers to sent
    //choose the handler this should go.If one is not found then use the not found handler
    const chosenHandler = routing(trimmedPath);
    // make the data to pass to routes about quesry ,body, headers etc
    let data = {
      queryStringObject: QueryStringObject,
      method: method,
      payload: helpers.parseJsonToObject(buffer),
    };
    //Route the request to the specific route according to the pathName
    chosenHandler(data, (statusCode, payload) => {
      //use the status code called back by the handler or default to 200 code
      //use the payload called back by the handler or default to an empty object
      //sends the response and logs the request
    });
  });
};
//routing todo:create routing for productdetails route
function routing(path) {
  if (path == 'products') {
    return handlers.products;
  } else {
    return handlers.notFound;
  }
}
