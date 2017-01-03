// ------------------------------------
// Constants
// ------------------------------------
export const TASKS_INCREMENT = 'TASKS_INCREMENT'
export const TASKS_DOUBLE_ASYNC = 'TASKS_DOUBLE_ASYNC'
export const GET_TASKS = 'GET_TASKS'
export const ALL_TASKS = 'ALL_TASKS'
export const EDIT_TASK = 'EDIT_TASK'
export const CREATE_TASK = 'CREATE_TASK'
export const DELETE_TASK = 'DELETE_TASK'
export const TASK_ERROR = 'TASK_ERROR'
export const CLOSE_ERROR = 'CLOSE_ERROR'
export const OPEN_FORM = 'OPEN_FORM'
export const CHANGE_FORM_DATA = 'CHANGE_FORM_DATA'

// ------------------------------------
// Actions
// ------------------------------------
export function tasks_increment(value = 1) {
  return {
    type: TASKS_INCREMENT,
    payload: value
  }
}

/*  This is a thunk, meaning it is a function that immediately
 returns a function for lazy evaluation. It is incredibly useful for
 creating async actions, especially when combined with redux-thunk! */

export const tasks_doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: TASKS_DOUBLE_ASYNC,
          payload: getState().tasks
        })
        resolve()
      }, 200)
    })
  }
}

export function getTasks() {
  return {
    type: GET_TASKS
  }
}

export function allTasks(tasks) {
  return {
    type: ALL_TASKS,
    tasks
  }
}

export function createTask(data) {
  return {
    type: CREATE_TASK,
    data
  }
}

export function editTask(taskId, data) {
  return {
    type: EDIT_TASK,
    taskId,
    data
  }
}

export function deleteTask(id) {
  return {
    type: DELETE_TASK,
    id
  }
}

export function taskError() {
  return {
    type: TASK_ERROR,
    error: true
  }
}

export function closeError() {
  return {
    type: CLOSE_ERROR,
    error: false
  }
}

export function toggleForm(open, data) {
  return {
    type: OPEN_FORM,
    open,
    data
  }
}

export const actions = {
  getTasks,
  createTask,
  taskError,
  closeError,
  allTasks,
  deleteTask
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_TASKS]: (state) => state,
  [DELETE_TASK]: state => state,
  [TASK_ERROR]: (state, action) => Object.assign({}, state, {openError: action.error}),
  [CLOSE_ERROR]: (state, action) => Object.assign({}, state, {openError: action.error}),
  [ALL_TASKS]: (state, action) => Object.assign({}, state, {tasks: action.tasks}),
  [OPEN_FORM]: (state, action) => {
    let newState = Object.assign({}, state, {openForm: action.open});

    newState.formData = action.data ? Object.assign({}, newState.formData, action.data) : {};

    return newState;
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  tasks: [],
  openError: false,
  openForm: false,
  formData: {}
}

export default function tasksReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
