// This module is sent to the browser

var ss = require('socketstream');

module.exports = function(responderId, config, send){

  // SENDING //

  // Optionally attach your own custom function to the 'ss' object
  // Here we're registering 'ss.echo()'
  ss.registerApi('echo', function(){

    // In this simple example we're only interested in the first argument sent to ss.echo()
    var args = Array.prototype.slice.call(arguments);
    var msg = args[0];

    // Do basic error checking client-side when possible
    if (msg && msg.length > 0) {

      console.log("Sending '" + msg + "' to the server...");
      send(msg);

    } else {

      console.log('Error: Please pass a valid string to the first argument');

    }

  });

  // RECEIVING //

  // Listen for incoming messages
  ss.message.on(responderId, function(msg){

    alert('Echo Responder says: ' + msg);

  });

}