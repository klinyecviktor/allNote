import io from 'socket.io-client';
import * as taskActions from '../routes/Tasks/modules/tasks';
import {taskActionReagent, taskSocketReagent} from '../routes/Tasks/reagents'

let socket = null;

const socketReagent = (socket, store) => {
  socket.on('get some data and dispatch it', data => {
    store.dispatch()
  })
}

// Send socket on Action
export function socketMiddleware(store) {
  return next => action => {
    const result = next(action);

    if (socket) {
      // action reactors
      taskActionReagent(socket, action, store);
    }

    return result;
  };
}




// Dispatch action on socket
export default function (store) {
  socket = io.connect(`${location.protocol}//${location.host}`);

  socket.on('get all Tasks', data => {
    store.dispatch(taskActions.addResponse(data));
  });

  taskSocketReagent(socket, store);
}
