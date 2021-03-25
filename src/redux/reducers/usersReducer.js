import { userActionTypes } from '../constants';

const users = (state = [], action) => {
    switch (action.type) {
      case userActionTypes.initialize:
        return [...state, 
          ...action.data
        ]
      case userActionTypes.addAvatars:
        return state.map((user, index) => {
          user.profile_picture = action.data[index];
          return user
        })
      default:
        return state
    }
  }
  
  export default users
  
