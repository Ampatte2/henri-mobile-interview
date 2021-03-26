import React, { useLayoutEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { Text, ScrollView, Image, View } from 'react-native';
import { addAvatars } from '../redux/actions';

export const Users = () => {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        /**
        * fetches face images from uifaces
        * on success adds avatars to user profiles
        **/
        const fetchStockFaceImages = async () => {
            try {
              const result = await axios.get('https://uifaces.co/api?limit=10', {
                method: 'GET',
                headers: {
                  'X-API-KEY': '8A06619F-97584CC7-81DB9794-56C15B69',
                  Accept: 'application/json',
                  'Cache-Control': 'no-cache'
                }
              })
              if (result.data) dispatch(addAvatars(result.data))
            } catch (e) {
              console.log(e)
            }
          }
          fetchStockFaceImages();
    }, [])

    /**
    * displays users information
    *@param {Array<user>} users 
    **/
    const renderUsers = () => {
        return users.map(user => (
            <View style={{ padding: 10, flex: 1, flexWrap: 'wrap' }} key={user.id}>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
                <Text>{user.phone}</Text>
                <Image source={{ uri: user.profile_picture }} style={{ width: 200, height: 200 }} />
            </View>
        ))
    }
    return (
        <ScrollView style={{ padding: 10, flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Users</Text>
            {renderUsers()}
        </ScrollView>
    )
}

