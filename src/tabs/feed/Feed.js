import React from 'react';
import { Text, ScrollView, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectPost } from '../../redux/actions';


export const Feed = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const feed = useSelector(state => state.feed);

    /**
    *@param {number} id - the id of selected post to navigate to
    **/
    const navigateToPost = (post) => {
        dispatch(selectPost(post))
        navigation.navigate('View Post')
    }

    /**
    * navigates to add post screen 
    **/
    const navigateToAdd = () => {
        navigation.navigate('Add Post')
    }

    /** 
    *@param {Array<posts>} posts - todos 
    **/
    const renderPosts = () => {
        return feed.posts.map(post => (
            <View 
                style={{ padding: 10, flex: 1, flexDirection: 'row', flexWrap: 'wrap' }} 
                key={post.id}
            >
                <View style={{ width: 200, marginLeft: 'auto' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                        {post.title}
                    </Text>
                </View>
                <View style={{ width: 100, marginLeft: 'auto' }}>
                    <Button 
                        title={`View ${post.id}'s Post`} 
                        onPress={() => navigateToPost(post)} 
                    />
                </View>
            </View>
        ))
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                {renderPosts()}
            </ScrollView>
            <View style={{ marginLeft: 'auto' }}>
                    <Button 
                        title='Add Post'
                        onPress={navigateToAdd} 
                    />
                </View>
        </View>
    )
}
