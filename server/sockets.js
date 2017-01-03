const mongoose = require('mongoose')
const config = require('../config/db.config')
const TasksEvents = require('./socketEvents/Tasks')

module.exports = (io) => {
  io.on('connection', socket => {
    TasksEvents(socket);


  })
}
