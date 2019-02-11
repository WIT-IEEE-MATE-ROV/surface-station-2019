const net = require('net')
const gamepad = require('gamepad')

const server = net.createServer()
gamepad.init()

setInterval(gamepad.processEvents, 15)

const clientCollection = []

server.on('connection', client => {
  client.write('Hi client')
  client.write({ id: 0, axis: 12, value: 99 })
  clientCollection.push(client)
})

gamepad.on('move', (id, axis, value) => {
  clientCollection.forEach(c => {
    c.write({ id, axis, value })
  })
})

server.listen(() => {
  console.log('server bound on', server.address())
})
