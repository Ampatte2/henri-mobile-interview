import React, { useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { createPost } from '../../redux/actions';

export const AddPost = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [title, setTitle] = useState();
    const [body, setBody] = useState();

    /**
    * updates title 
    *@param {string} text 
    **/
    const updateTitleText = (text) => {
        setTitle(text)
    }

    /**
    * updates body 
    *@param {string} text 
    **/
    const updateBodyText = (text) => {
        setBody(text)
    }

    /**
    * save to database/store
    * navigate back
    **/
    const savePost = async () => {
        try {
            const randomId = Math.floor(Math.random() * 10)
            const newPost = { body, title, id: randomId, userId: randomId }
            await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
            dispatch(createPost(newPost))
            navigation.goBack();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            <Text style={{ fontWeight: 'bold', margin: 'auto', fontSize: 20 }}>Add Post</Text>
            <Text>Title</Text>
            <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                <TextInput onChangeText={updateTitleText} value={title} />
            </View>
            <Text>Body</Text>
            <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                
                <TextInput onChangeText={updateBodyText} value={body} />
            </View>
            <View style={{ width: 100, marginTop: 10 }}>
                    <Button 
                        title={'Publish Post'} 
                        onPress={savePost} 
                    />
                </View>
        </View>
    )
}
