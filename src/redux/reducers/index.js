import { combineReducers } from 'redux'
import todos from './todosReducer';
import users from './usersReducer';
import feed from './feedReducer';


export default combineReducers({
  todos,
  users,
  feed
})
