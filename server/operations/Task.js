const Task = require('../models/Task');

exports.findAll = (socket) => {
  console.log('findAll run');

  Task.find({}).sort({done: 'asc', priority: 'desc'}).exec((err, tasks) => {
    if (!err) {
      //TODO: do it correctly
      socket.emit('all Tasks', tasks);
    }
  })
}

exports.create = (socket, data, handleFunction) => {
  // Maybe data parse needed
  Task.create(data, (err) => {
    if (err) console.error(err);

    handleFunction(err);
  })
}

exports.delete = (socket, id, handleFunction) => {
  Task.remove({_id: id}, err => {
    if (err) console.error(err);

    handleFunction(err);
  })
}

exports.update = (socket, id, data, handleFunction) => {
  Task.update({ _id: id }, { $set: data}, err => {
    if (err) console.error(err)

    handleFunction(err);
  });
}
