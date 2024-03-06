/// <reference path="../types.d.ts" />

const helpers = require('./helpers.js');
const _products = require('./products.js');
const _productDetails = require('./productDetails.js');
//Handlers

/** 
 * @type {handler} 
 */
const handlers = new Map();

handlers.set('product', {
  'GET': (req, res) => {
  }
})

//product Details Handler
handlers.productDetails = (data, callback) => {
  if (data.method === 'get') {
    _productsDetails.get(data, callback);
  } else {
    callback(405);
  }
};

//Not found handler
handlers.notFound = (data, callback) => {
  callback(404);
};
module.exports = handlers;
