import { combineReducers } from 'redux'
import todos from './todosReducer';
import users from './usersReducer';


export default combineReducers({
  todos,
  users
})
