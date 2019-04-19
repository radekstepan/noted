const express = require('express');
const error = require('serialize-error');

const API_METHODS = ['get', 'post', 'put', 'delete'];

module.exports = () => {
  const app = express();

  return new Proxy(app, {
    get: (target, method) => (...args) => {
      if (API_METHODS.indexOf(method) !== -1) {
        const handler = args.pop();
        // Handle async thrown errors from API handler fn.
        args.push(async (req, res) => {
          try {
            await handler(req, res);
          } catch (err) {
            const {response, message} = error(err);
            res.status(500).json({error: response || message || `${err}`});
          }
        });
      }

      return target[method](...args);
    }
  });
};
