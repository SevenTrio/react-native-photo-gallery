import React from 'react'
import { View, Text } from 'react-native';

const PhotoScreen = ({ route }) => {
  const { itemId } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Photo Screen</Text>
      <Text>View item id: {itemId}</Text>
    </View>
  );
}

export default PhotoScreen;