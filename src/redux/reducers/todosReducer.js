import { todoActionTypes } from '../constants';

const todos = (state = [], action) => {
    switch (action.type) {
      case todoActionTypes.add:
        return [...state, 
          ...action.data
        ]
      case todoActionTypes.complete:
        return state.map(todo =>
          ((todo.id === action.data)
            ? { ...todo, completed: true }
            : todo)
        )
      case todoActionTypes.reset:
        return state.map(todo =>
          ((todo.id === action.data)
            ? { ...todo, completed: false }
            : todo)
        )
      default:
        return state
    }
  }
  
  export default todos
  
