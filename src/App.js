import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import store from './store';
import GalleryScreen from './screens/GalleryScreen';
import PhotoScreen from './screens/PhotoScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Gallery" component={GalleryScreen} options={{ title: 'Список изображений' }} />
          <Stack.Screen name="Photo" component={PhotoScreen} options={{ title: 'Изображение' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
