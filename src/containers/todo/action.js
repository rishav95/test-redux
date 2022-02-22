import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api';

export const todoAdded = (todo) => ({ type: 'todos/todoAdded', payload: todo })

export const todoToggled = (todoId) => ({
  type: 'todos/todoToggled',
  payload: todoId,
})

export const todoColorSelected = (todoId, color) => ({
  type: 'todos/colorSelected',
  payload: { todoId, color },
})

export const todoDeleted = (todoId) => ({
  type: 'todos/todoDeleted',
  payload: todoId,
})

export const todoUpdated = (payload) => ({
  type: 'todos/todoUpdated',
  payload: payload,
})

export const allTodosCompleted = () => ({ type: 'todos/allCompleted' })

export const completedTodosCleared = () => ({ type: 'todos/completedCleared' })

export const todosLoading = () => ({ type: 'todos/todosLoading' })

export const todosLoaded = (todos) => ({
  type: 'todos/todosLoaded',
  payload: todos,
})

// Thunk function
export const handleFetchTodos = () => async (dispatch) => {
  dispatch(todosLoading())
  const response = await fetchTodos()
  dispatch(todosLoaded(response?.todos.map(item => ({
      ...item,
      completed: !!item.completed,
    })
  ) || []))
}

export function saveNewTodo(payload) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const response = await createTodo(payload) // {text: , completed: }
    dispatch(
      todoAdded({
        ...response.todo,
        completed: !!response.todo.completed,
      })
    )
  }
}

export function updateOldTodo(payload) {
  return async function(dispatch, getState) {
    const response = await updateTodo(payload)

    console.log({
      ...response.todo,
      completed: !!response.todo.completed,
    })

    dispatch(
      todoUpdated({
        ...response.todo,
        completed: !!response.todo.completed,
      })
    )
  }
}

export function removeTodo(id) {
  return async function (dispatch, getState) {
    const response = await deleteTodo(id)
    dispatch(todoDeleted(response.todo))
  }
}
