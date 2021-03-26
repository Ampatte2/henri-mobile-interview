import { feedActionTypes } from '../constants';

const INITIAL_SELECTED_POST = { id: -1, body: '', title: '', userId: -1 }

const feed = (
    state = { posts: [], selectedPost: INITIAL_SELECTED_POST }, 
    action
) => {
    switch (action.type) {
      case feedActionTypes.initialize:
        return {
            posts: [...state.posts, ...action.data],
            selectedPost: state.selectedPost
        }
    case feedActionTypes.selectPost:
            return {
                posts: state.posts,
                selectedPost: action.data
            }
    case feedActionTypes.delete:
        return {
            posts: state.posts.filter(post => post.id !== action.data),
            selectedPost: INITIAL_SELECTED_POST
        }
    case feedActionTypes.create:
        return {
            posts: [...state.posts, action.data],
            selectedPost: state.selectedPost
        }
      default:
        return state
    }
  }
  
  export default feed
  
