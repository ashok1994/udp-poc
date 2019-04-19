const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const moment = require('moment');
const os = require('os');
const ip = require('ip');
const PORT = '9090';
/**
 * With Berkely sockets (which seem to be the most widely used implementation of sockets) 
 * you need to enable the SO_BROADCAST socket option to be able to send datagrams to the broadcast address
 */
server.on('listening', () => {
    server.setBroadcast(true);
})


/**
 * Util
 */
let getBroadcastAddress = (subnetMask, hostIPAddress)=> ip.or(ip.not(subnetMask), hostIPAddress);

let getSubnetMask = () => {
    let netInterfaces = os.networkInterfaces();
    for(let interface in netInterfaces){
        const configArr = netInterfaces[interface];
        const subnetMaskConfig = configArr.find(config => config.family === 'IPv4' && config.internal === false && config.netmask);
        if(subnetMaskConfig){
            return subnetMaskConfig.netmask;
        }
    }
} 

let createUDPPacket = (message) => new Buffer(message);
let sendUDPPacket = (packet, port, address, offset) => server.send(packet, offset, packet.length, port, address, (err, bytes) => {
    console.log('Message send');
})


/* Preparing for broadcast message on local subnet*/
let subnetMask = getSubnetMask();
let broadcastAddress = getBroadcastAddress(subnetMask, ip.address());

console.log(broadcastAddress);
/* Sending UDP packets for broadcast */
setInterval(() => {
    let packet = createUDPPacket('Hello World, are you ready to listen?');
    sendUDPPacket(packet, PORT, broadcastAddress, 0);
}, 1000);


