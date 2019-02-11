const net = require('net')
const gamepad = require('gamepad')

const server = net.createServer()
gamepad.init()

setInterval(gamepad.processEvents, 15)

const clientCollection = []

server.on('connection', client => {
  // client.write('Hi client')
  client.write(Buffer.from([1, 2, 3]))
  clientCollection.push(client)
})

gamepad.on('move', (id, axis, value) => {
  clientCollection.forEach(c => {
    c.write(Buffer.from([id, axis, value]))
  })
})

server.listen(80, () => {
  console.log('server bound on', server.address())
})
