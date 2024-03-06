const helpers = require('./helpers.js');
const _products = require('./products.js');
const _productDetails = require('./productDetails.js');
//Handlers
const handlers = {};
//products handler
handlers.products = (data, callback) => {
  if (data.method === 'get') {
    _products.get(data, callback);
  } else {
    callback(405);
  }
};

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
