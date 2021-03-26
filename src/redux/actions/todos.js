import { todoActionTypes } from '../constants';

export const addTodos = (todos) => ({
    type: todoActionTypes.add,
    data: todos
})

export const initializeTodos = function (dispatch, getState, instance) {
        return instance.get('/todos?_limit=20').then(({ data }) => {
            dispatch(addTodos(data))
        })
}

export const completeTodo = todoId => ({
    type: todoActionTypes.complete,
    data: todoId
})

export const resetTodo = todoId => ({
    type: todoActionTypes.reset,
    data: todoId
})
