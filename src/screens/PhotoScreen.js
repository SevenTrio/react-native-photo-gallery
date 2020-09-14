import React, { useState } from 'react'
import { ActivityIndicator, View, ScrollView, StyleSheet, Image, Text } from 'react-native';
import { Dimensions } from 'react-native';
import { ucFirst } from '../utils'

const PhotoScreen = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const win = Dimensions.get('window');
  const photo = route.params;
  const ratio = win.width / photo.width;

  return (
    <ScrollView>
      <View style={styles.screenContainer}>
        <View style={styles.imageContainer}>
          <Image
            onLoad={() => { setLoading(false) }}
            style={{ ...styles.image, width: win.width, height: photo.height * ratio }}
            source={{
              uri: photo.urls.full,
            }}
          />

          {loading && <Loading />}

        </View>

        <View style={{ ...styles.text, maxWidth: win.width }}>
          <Text style={styles.description}>{ucFirst(photo.description || photo.alt_description)}</Text>
          <Text style={styles.author}>{`Автор: ${photo.user.name}`}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#4444ff" />
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center'
  },
  imageContainer: {
    position: 'relative'
  },
  image: {
    resizeMode: 'cover',
    backgroundColor: '#bdbdbd',
  },
  loadingContainer: {
    position: "absolute",
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    width: '100%',
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  description: {
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
  },
  author: {
    fontSize: 16,
    color: "#666666",
  },
});

export default PhotoScreen;