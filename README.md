# Echo Request Responder for SocketStream 0.3

This is an example of an ultra-simple Request Responder for SocketStream.

The echo responder simply converts any incoming message into uppercase before sending it back to the browser.

The code has been fully annotated to encourage you to use it as a basis to develop your own Request Responder, allowing you to experiment with models, low-level protocols (for gaming), user presence and much more.


### Try it out

Clone the repo locally and install it with:

    [sudo] npm link

Create a new SocketStream project and create a local link to this repo:

    cd my_new_socketstream_project
    [sudo] npm link ss-echo-responder

Add the Echo Responder to your stack:

```javascript
// in app.js
ss.responders.add(require('ss-echo-responder'));
```

Start your app then call the Echo Responder in the browser's console:

    ss.echo('Test from browser');

The responder will transform the message into uppercase before calling `alert()` in the browser.

***

To find out how to use this project as a basis for you own Request Responder, please [read the documentation here](https://github.com/socketstream/socketstream/blob/master/doc/guide/en/writing_request_responders.md).