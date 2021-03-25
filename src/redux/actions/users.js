import { userActionTypes } from '../constants';

export const addUsers = users => ({
    type: userActionTypes.initialize,
    data: users
})

export const initializeUsers = function (dispatch, getStore, instance) {
        return instance.get('/users').then(({ data }) => {
            dispatch(addUsers(data))
        })
    }

export const addAvatars = avatars => ({
    type: userActionTypes.addAvatars,
    data: avatars
})
