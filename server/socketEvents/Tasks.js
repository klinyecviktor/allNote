const Task = require('../operations/Task')

module.exports = (socket) => {
  console.log('Tasks socket events connected')

  socket.on('create Task', data => {
    Task.create(socket, data, err => {
      err ? socket.emit('Task error') : Task.findAll(socket)
    });
  })

  socket.on('get Tasks', () => {
    Task.findAll(socket);
  })

  socket.on('delete Task', id => {
    Task.delete(socket, id, err => {
      err ? socket.emit('Task error') : Task.findAll(socket)
    })
  })

  socket.on('update Task', (id, data) => {
    Task.update(socket, id, data, err => {
      err ? socket.emit('Task error') : Task.findAll(socket)
    })
  })
}
