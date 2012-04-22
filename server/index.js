// Example 'Echo' Request Responder code for SocketStream
// Simply transforms incoming messages to uppercase before sending the message back to the browser

var fs = require('fs'),
    path = require('path');

// responderId : The unique ID assigned to this Request Responder by SocketStream
// config      : Any optional config params defined by the user in their own /app.js file
// ss          : The SocketStream internal API object
module.exports = function(responderId, config, ss){

  var name = config && config.name || 'echo';

  /// SENDING CLIENT-SIDE CODE ///

  // The ss.client.send function allows you to send any type of code to the browser
  // Note: All client-side code will be automatically minimized in production but
  // please take care to only send what is absolutely required, as every byte counts

  // Here's an example of sending a client-side library to the browser
  //ss.client.send('lib', 'underscore', loadFile('underscore.js'));

  // Send client-side code for this responder as a module
  ss.client.send('mod', 'echo-responder', loadFile('responder.js'));

  // Automatically initialize the client-side module when the browser loads
  // Change 'echo-responder' to the name of your responder, but don't change the arguments passed
  ss.client.send('code', 'init', "require('echo-responder')("+responderId+", {}, require('socketstream').send("+responderId+"));")

  // Return Responder API
  return {

    name: name,

    /// EXPOSING SERVER-SIDE INTERFACES ///

    // Once ss.start(server) has been called in your app.js file, any middleware in
    // /server/middleware will be loaded and passed into the function below
    // Whether or not your module chooses to use it is up to you
    interfaces: function(middleware){

      return {

        // Expose the Websocket interface. Other interfaces (to allow you to access this responder over ss-console
        // or for server-side testing) are currently being finalized and will be available as options in the near future
        //
        // msg  : the raw incoming message (as a string)
        // meta : an object containing additional meta data about this request
        // send : a function to send a response back to the originating client (optional)
        websocket: function(msg, meta, send){

          // Log incoming message to the terminal
          ss.log('↪'.cyan, 'echo'.grey, msg);

          // Transform message to uppercase
          msg = String(msg.toUpperCase());

          // Log outgoing message to the terminal
          ss.log('↩'.green, 'echo'.grey, msg);

          // Send a response back to the originating client
          // Note: This is optional. If your client code is simply sending a heartbeat
          // you may not necessarily want to acknowledge every request
          send(msg);

        }

      }
    }
  }
}

// Helper to load client files
// Note we use readFileSync as the file is only ever loaded once when you start the server and cached in RAM thereafter
var loadFile = function(name){
  var fileName = path.join(__dirname, '../client', name);
  return fs.readFileSync(fileName, 'utf8');
}