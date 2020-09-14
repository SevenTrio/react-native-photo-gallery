import React, { useEffect } from 'react'
import { ActivityIndicator, View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as galleryActions from '../store/actions/gallery';

import Gallery from '../components/Gallery'

const GalleryScreen = ({ navigation, gallery, fetchPhotos }) => {
  useEffect(() => {
    fetchPhotos();
  }, []);

  const handlePhotoPress = (photo) => {
    navigation.navigate('Photo', photo);
  }

  return (
    <ScrollView>
      <View style={styles.screenContainer}>

        <Gallery photos={gallery.photos} onPhotoPress={handlePhotoPress} />

        {gallery.photos.isFetching && <Loading />}

        {gallery.photos.isError && !gallery.photos.isFetching && <Error />}

        <ShowMoreButton onPress={() => fetchPhotos()} />

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

const Error = () => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>Упс.. Произошла ошибка, пожалуйста, попробуйте позже..</Text>
    </View>
  )
}

const ShowMoreButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.showMoreButton}
      onPress={onPress}
    >
      <Text style={styles.showMoreButtonText}>Загрузить больше фотографий</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
  },
  loadingContainer: {
    marginVertical: 32,
  },
  errorContainer: {
    marginVertical: 32,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#ff0000',
  },
  showMoreButton: {
    alignItems: "center",
    marginVertical: 24,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#0059ff",
    borderRadius: 16,
  },
  showMoreButtonText: {
    color: '#ffffff'
  }
});


const mapStateToProps = ({ gallery }) => ({
  gallery
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(galleryActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GalleryScreen);