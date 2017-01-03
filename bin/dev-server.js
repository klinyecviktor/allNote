const project = require('../config/project.config')
const app = require('../server/main')
const server = require('http').Server(app)
const debug = require('debug')('app:bin:dev-server')
const io = require('socket.io')(server)

const allSocketEvents = require('../server/sockets')

server.listen(project.server_port)


//
// Socket.IO emits and received events
//
allSocketEvents(io);

debug(`Server is now running at http://localhost:${project.server_port}.`)
