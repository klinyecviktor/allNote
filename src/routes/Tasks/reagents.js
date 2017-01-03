import {
  GET_TASKS,
  CREATE_TASK,
  DELETE_TASK,
  EDIT_TASK,
  taskError,
  allTasks

} from './modules/tasks'

export const taskActionReagent =(socket, action, store) => {
  if (action.type === CREATE_TASK) {
    console.log(CREATE_TASK, action);
    socket.emit('create Task', action.data)
  } else if (action.type === GET_TASKS) {
    socket.emit('get Tasks');
  } else if (action.type === DELETE_TASK) {
    socket.emit('delete Task', action.id)
  } else if (action.type === EDIT_TASK) {
    socket.emit('update Task', action.taskId, action.data);
  }
}

export const taskSocketReagent = (socket, store) => {
  socket.on('get some data and dispatch it', data => {
    store.dispatch()
  })

  socket.on('all Tasks', tasks => {
    store.dispatch(allTasks(tasks))
  })

  socket.on('Task error', () => {
    console.error('Task error')
    store.dispatch(taskError())
  })
}
