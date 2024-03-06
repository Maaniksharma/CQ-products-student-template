/// <reference path="types.d.ts" />
// This is the primary file for the api


// Dependencies
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const config = require('./config.js');
const handlers = require('./lib/handlers.js');
const helpers = require('./lib/helpers.js');
const dataParser = require('./lib/dataParser.js');

// the server should respond to all requests with a string
//http server intatnination
let httpServer = http.createServer((req, res) => {
  Server(req, res);
});

//start the http server and have it listen on port 3000
httpServer.listen(config.httpPort, () => {
  console.log(
    `http server is listening on port ${config.httpPort} in ${config.envName} mode`,
  );
});

//server function
const Server = (req, res) => {
  //get the url and parse it
  const finalReq = {};
  finalReq.body = dataParser(buffer, req.headers);
  finalReq.url = (req.url ?? '').trim();
  // Do it your selfs
  finalReq.query  = ''

  const finalRes = {
    /**
     * 
     * @param {number} statusCode 
     * @param {string} data 
     */
    'end': (statusCode, data) => {
      res.statusCode(statusCode);
      res.end(data)
    },
    /**
     * 
     * @param {string} header 
     */
    'setHeaders': (header) => {
      res.setHeaders(header);
    }
  }

  //get the path
  // const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
  //get the http method

  //get the query string as objects

  let buffer = '';
  // storing body data in buffer
  // req.on('data', (data) => {
  //   buffer += data;
  // });

  req.on('end', () => {
    let parsedReq = {};
    
    if (req.headers['Content-Type'] === 'application/json') {
      try {
        parsedReq.body = helpers.parseJsonToObject(buffer);
      } catch(error) {
        parsedReq.body = {};
        console.log('Invalid Payload');
      }
    }
    //static files handling with /public route and also handle the content type of headers to sent
    //choose the handler this should go.If one is not found then use the not found handler

    const chosenHandler = routing(finalReq.url, req.method);
    //Route the request to the specific route according to the pathName
    
    req = {
      body: helpers.parseJsonToObject(buffer) ?? {},
      
    }
    
    chosenHandler(finalReq, finalRes) ;

    //sends the response and logs the request
  });
};
/**
 * 
 * @param {string} path 
 * @param {method} method 
 * @returns {(req: Request, res: Response) => void}
 */
function routing(path, method) {
  if (path == 'products' && [method] in handlers.products) {
      return handlers.products[method];
  }
  if (path == 'productHandler' && [method]  in handlers.productDetails) {
    return  handlers.productDetails[method];
  }
  return handlers.notFound;
}
