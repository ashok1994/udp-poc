const dgram = require('dgram');
const client = dgram.createSocket('udp4');


client.on('message', (message) => {
    console.log(message.toString());
})

client.bind(9090);