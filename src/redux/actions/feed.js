import { feedActionTypes } from '../constants';

export const loadFeed = (feed) => ({
    type: feedActionTypes.initialize,
    data: feed
})

export const createPost = post => ({
    type: feedActionTypes.create,
    data: post
})

export const deletePost = postId => ({
    type: feedActionTypes.delete,
    data: postId
})
export const selectPost = post => ({
    type: feedActionTypes.selectPost,
    data: post
})

export const initializeFeed = function (dispatch, getState, instance) {
        return instance.get('/posts?_limit=20').then(({ data }) => {
            dispatch(loadFeed(data))
    })
}
