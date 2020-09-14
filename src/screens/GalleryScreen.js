import React, { useEffect } from 'react'
import { Button, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as galleryActions from '../store/actions/gallery';

const HomeScreen = ({ navigation, gallery, fetchPhotos }) => {
  useEffect(() => {
    fetchPhotos();
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      { gallery.photos.items.length ? gallery.photos.items.map((item, index) => <Text key={index}>{item.id}</Text>) : null}

      {
        gallery.photos.isFetching
          ?
          <Text>Loading...</Text>
          :
          null
      }
      {
        (gallery.photos.isError && !gallery.photos.isFetching)
          ?
          <Text>Error</Text>
          :
          null
      }

      <Button
        title="Загрузить больше фотографий"
        onPress={() => {
          fetchPhotos();
        }}
      />
    </View>
  );
}

const mapStateToProps = ({ gallery }) => ({
  gallery
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(galleryActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);