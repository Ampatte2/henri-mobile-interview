import React, { useLayoutEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { Text, ScrollView, Button, Image, View } from 'react-native';
import { addAvatars } from '../redux/actions';

export const Users = () => {
    const users = useSelector(state => state.users);
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        const getUI = async () => {
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
          getUI();
    }, [])

    const renderUsers = () => {
        return users.map(user => (
            <View style={{ padding: 10, flex: 1, flexWrap: 'wrap' }} key={user.id}>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
                <Image source={{ uri: user.photo }} style={{ width: 200, height: 200 }} />
            </View>
        ))
    }
    return (
        <ScrollView style={{ padding: 10, flex: 1 }}>
            {renderUsers()}
        </ScrollView>
    )
}

