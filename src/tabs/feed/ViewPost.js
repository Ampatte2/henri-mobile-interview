import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { deletePost } from '../../redux/actions';


export const ViewPost = () => {
    const navigation = useNavigation();
    const [postersName, setPostersName] = useState('');
    const selectedPost = useSelector(state => state.feed.selectedPost);
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    useEffect(() => {
        const userProfileFromPostId = users.find(user => user.id === selectedPost.userId)
        if (userProfileFromPostId) {
            setPostersName(userProfileFromPostId.name);
        }
    }, [selectedPost.id]);

    const removePost = async () => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${selectedPost.id}`);
            dispatch(deletePost(selectedPost.id));
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            <Text>{postersName}</Text>
            <Text>{selectedPost.title}</Text>
            <Text>{selectedPost.body}</Text>
            <View style={{ width: 100 }}>
                    <Button 
                        title={'Delete Post'} 
                        onPress={removePost} 
                    />
                </View>
        </View>
    )
}
