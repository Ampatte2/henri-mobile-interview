import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { deletePost } from '../../redux/actions';


export const ViewPost = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);
    const [postersName, setPostersName] = useState('');
    const [comments, setComments] = useState([]);
    const selectedPost = useSelector(state => state.feed.selectedPost);
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    useEffect(() => {
        const userProfileFromPostId = users.find(user => user.id === selectedPost.userId)
        if (userProfileFromPostId) {
            setPostersName(userProfileFromPostId.name);
        }
        /**
        * fetches comments for selected post
        *@param {number} selectedPost.id - currently selected post 
        **/
        const getComments = async () => {
            try {
                const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${selectedPost.id}/comments`);
                if (data) {
                    setComments(data)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getComments();
    }, [selectedPost.id]);

    /**
    * removes post
    * navigates back
    *@param {number} selectedPost.id - currently selected post 
    **/
    const removePost = async () => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${selectedPost.id}`);
            dispatch(deletePost(selectedPost.id));
            navigation.goBack();
        } catch (error) {
            console.log(error);
        }
    }

    /**
    * Returns comments or activity indicator 
    *@param {boolean} isLoading
    *@param {Array<comments} comments - comments from database  
    **/
    const renderComments = () => {
        if (isLoading) {
            return (
                <View 
                    style={{ 
                        flex: 1, 
                        justifyContent: 'center',
                        flexDirection: 'column',
                        padding: 10 }}
                >
                    <Text style={{ textAlign: 'center' }}>Loading Comments</Text>
                    <ActivityIndicator size='large' color='red' />
                </View>)
        } 
            return comments.map(comment => 
                (<View style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
                    <Text style={{ marginBottom: 20, fontWeight: 'bold' }}>{comment.name}</Text>
                    <Text >{comment.body}</Text>
                    <Text style={{ marginTop: 20 }}>{comment.email}</Text>
                </View>)
            )
        }

    return (
        <ScrollView style={{ padding: 10 }}>
            <Text>{postersName}</Text>
            <Text>{selectedPost.title}</Text>
            <Text>{selectedPost.body}</Text>
            <View style={{ width: 100 }}>
                <Button 
                    title={'Delete Post'} 
                    onPress={removePost} 
                />
            </View>
            {renderComments()}
        </ScrollView>
    )
}
