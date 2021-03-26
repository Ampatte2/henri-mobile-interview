import React from 'react';
import { Text, ScrollView, View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { completeTodo, resetTodo } from '../redux/actions';

export const Todos = () => {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    
    /**
    *@param {string} id - id of the todo
    *@param {value} isCompleted - is the todo already compelte
    **/
    const modifyTodo = (id, isCompleted) => {
        if (isCompleted) {
            dispatch(resetTodo(id))
        } else {
            dispatch(completeTodo(id))
        }
    }

    /** 
    *@param {Array<todos>} todos - todos 
    **/
    const renderTodos = () => {
        return todos.map(todo => (
            <View 
                style={{ padding: 10, flex: 1, flexDirection: 'row', flexWrap: 'wrap' }} 
                key={todo.id}
            >
                <View style={{ width: 200, marginLeft: 'auto' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                        {todo.completed ? 'Complete' : 'Incomplete'}
                    </Text>
                    <Text numberOfLines={5}>{todo.title}</Text>
                </View>
                <View style={{ width: 100, marginLeft: 'auto' }}>
                    <Button 
                        title={todo.completed ? 'Reset' : 'Done'} 
                        onPress={() => modifyTodo(todo.id, todo.completed)} 
                        color={todo.completed ? 'grey' : 'red'} 
                    />
                </View>
            </View>
        ))
    }
    return (
        <ScrollView>
            {renderTodos()}
        </ScrollView>
    )
}
