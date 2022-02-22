import { createSelector } from 'reselect'
import { StatusFilters } from '../filter/contants'

const initialState = {
  status: 'idle',
  entities: {}, // [{id: 14, text: "", completed: false}]
}

// entities{
//   4: {
//     id: '4', text: "", completed: boolean, color: ""
//   }
// }

// { id: '', text: "", completed: boolean, color: "" }

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      const todo = action.payload
      return {
        ...state,
        entities: {
          ...state.entities,
          [todo.id]: todo,
        },
      }
    }
    case 'todos/todoToggled': {
      const todoId = action.payload // 4
      const todo = state.entities[todoId]
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: { // 4: {}
            ...todo,
            completed: !todo.completed,
          },
        },
      }
    }
    case 'todos/colorSelected': {
      const { color, todoId } = action.payload
      const todo = state.entities[todoId]
      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            color,
          },
        },
      }
    }
    case 'todos/todoUpdated': {
      const { id } = action.payload

      return {
        ...state,
        entities: {
          ...state.entities, // {14: {id: 14, text: "", completed: boolean}}
          [id]: {
            ...action.payload
          },
        },

        /* 
          entities: state.entities.map(todo => {
            if(todo.id === id) {
              return action.payload
            } else {
              return todo
            }
          })
        */
      }
    }
    case 'todos/todoDeleted': {
      // state.entities.filter(item => item.id !== action.payload)
      const newEntities = { ...state.entities }
      delete newEntities[action.payload]
      return {
        ...state,
        entities: newEntities,
      }
    }
    case 'todos/allCompleted': {
      const newEntities = { ...state.entities }

      // {1: {id: 1, text: "asdasd", completed: true, color: "qweqweqwe"}, 2: {...}, 3: {...}}

      Object.keys(newEntities) // [1, 2, 3]
      Object.values(newEntities).forEach((todo) => { // [{...}, {...}, {...}]
        newEntities[todo.id] = {
          ...todo,
          completed: true,
        }
      })
      return {
        ...state,
        entities: newEntities,
      }
    }
    case 'todos/completedCleared': {
      const newEntities = { ...state.entities }
      Object.values(newEntities).forEach((todo) => {
        if (todo.completed) {
          delete newEntities[todo.id]
        }
      })
      return {
        ...state,
        entities: newEntities,
      }
    }
    case 'todos/todosLoading': {
      return {
        ...state,
        status: 'loading',
      }
    }
    case 'todos/todosLoaded': {
      const newEntities = {}
      action.payload.forEach((todo) => {
        newEntities[todo.id] = todo
      })
      return {
        ...state,
        status: 'idle',
        entities: newEntities,
      }
    }
    default:
      return state
  }
}

export const selectTodoEntities = (state) => Object.values(state.todos.entities)

export const selectTodoById = (state, todoId) => {
  return state.todos.entities[todoId]
}

export const selectTodoIds = (state) => state.todos.entities.map(todo => todo.id);

export const selectFilteredTodos = (state) => {
  const todos = selectTodoEntities(state);
  const filters = state.filters

  const { status, colors } = filters
  const showAllCompletions = status === StatusFilters.All
  if (showAllCompletions && colors.length === 0) {
    return todos
  }

  const completedStatus = status === StatusFilters.Completed
  // Return either active or completed todos based on filter
  return todos.filter((todo) => {
    const statusMatches =
      showAllCompletions || todo.completed === completedStatus // green
    const colorMatches = colors.length === 0 || colors.includes(todo.color) // ['green', 'blue', 'orange']
    return statusMatches && colorMatches
  })
}

export const selectFilteredTodoIds = (state) => {
  return selectFilteredTodos(state).map((todo) => todo.id)
}

// export const selectTodos = createSelector(selectTodoEntities, (entities) =>
//   Object.values(entities)
// )

// export const selectTodoIds = createSelector(
//   // First, pass one or more "input selector" functions:
//   selectTodoEntities,
//   // Then, an "output selector" that receives all the input results as arguments
//   // and returns a final result value
//   (todos) => todos.map((todo) => todo.id)
// )

// export const selectFilteredTodos = createSelector(
//   // First input selector: all todos
//   selectTodoEntities,
//   // Second input selector: all filter values
//   (state) => state.filters,
//   // Output selector: receives both values
//   (todos, filters) => {
//     const { status, colors } = filters
//     const showAllCompletions = status === StatusFilters.All
//     if (showAllCompletions && colors.length === 0) {
//       return todos
//     }

//     const completedStatus = status === StatusFilters.Completed
//     // Return either active or completed todos based on filter
//     return todos.filter((todo) => {
//       const statusMatches =
//         showAllCompletions || todo.completed === completedStatus
//       const colorMatches = colors.length === 0 || colors.includes(todo.color)
//       return statusMatches && colorMatches
//     })
//   }
// )

// export const selectFilteredTodoIds = createSelector(
//   // Pass our other memoized selector as an input
//   selectFilteredTodos,
//   // And derive data in the output selector
//   (filteredTodos) => filteredTodos.map((todo) => todo.id)
// )
