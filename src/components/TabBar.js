import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const Tab = ({ state, descriptors, navigation }) => {
    return (
      <View
        style={{ 
          flexDirection: 'row', 
          padding: 20, 
          borderTopColor: 'black', 
          borderTopWidth: 1 
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = route.name
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
            >
              <Text style={{ color: isFocused ? '#673ab7' : '#222', textAlign: 'center' }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
