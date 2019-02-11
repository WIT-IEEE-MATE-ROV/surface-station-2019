const net = require('net')

const client = net.createConnection(80, '::', () => {
  console.log('connected to server!')
})

client.on('data', data => {
  console.log(Array.from(data))
})
