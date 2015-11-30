# socket.io-redis Application Example

This is a very simple Node.JS client/server application that shows how to setup [Express.js](http://expressjs.com/), [Socket.IO 1.x](http://socket.io/) and [socket.io-redis](https://github.com/socketio/socket.io-redis) together.

This is very useful as a starting point to understand how to scale Socket.IO RealTime Applications that need multiple server processes. Redis is used as a storage point (adapter) in order to run multiple socket.io instances in different processes or servers that can all broadcast and emit events to and from each other.

The application uses all the interesting Socket.IO features like **namespaces** and **rooms**. Take a look to the code to learn how.

This work was inspired by [socket.io-redis-sample](https://github.com/stoshiya/socket.io-redis-sample) and extended to test namespaces and rooms.

## Usage

1. Run redis-server (the application uses default configuration)
```
$ redis-server
```

2. Clone this repo and cd into the root to install its dependencies
```
$ git clone https://github.com/h4t0n/socket.io-redis-appsample.git
$ cd socket.io-redis-appsample
$ npm install
```

3. Run the application multiple times (use different ports)
```
$ PORT=3000 node app.js
$ PORT=3001 node app.js
$ PORT=3002 node app.js
$ PORT=3003 node app.js
```

4. Use the browser to to connect to each application and emit events/messages to other clients interacting with the client app.
```
$ google-chrome http://127.0.0.1:3000
$ google-chrome http://127.0.0.1:3001
$ google-chrome http://127.0.0.1:3002
$ google-chrome http://127.0.0.1:3003
```

## License

MIT © [Andrea Tarquini](https://blog.h4t0n.com)
