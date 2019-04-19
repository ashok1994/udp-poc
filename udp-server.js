const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const moment = require('moment');

/* Error handling */
server.on('error', (err)=> {
    console.log('error', err);
    server.close();
});

/* Message handling */
server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} at ${moment().format('YYYY-MM-DD hh:mm:ss:SSS').trim()}from ${rinfo.address}:${rinfo.port}`);
});

/* Server started listening */
server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
})

/* Bind to a port */
server.bind(41234);