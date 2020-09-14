import {
  FETCHING_ERROR,
  REQUEST_PHOTOS,
  RECEIVE_PHOTOS
} from '../actions/gallery'

const galleryInitialState = {
  page: 1,
  per_page: 10,
  photos: {
    isFetching: false,
    isError: false,
    items: []
  }
};

const gallery = (state = galleryInitialState, action) => {
  switch (action.type) {
    case FETCHING_ERROR:
      return {
        ...state,
        photos: {
          ...state.photos,
          isFetching: false,
          isError: true
        }
      }
    case REQUEST_PHOTOS:
      return {
        ...state,
        photos: {
          ...state.photos,
          isFetching: true,
        }
      }
    case RECEIVE_PHOTOS:
      return {
        ...state,
        page: state.page + 1,
        photos: {
          ...state.photos,
          isFetching: false,
          isError: false,
          items: [...state.photos.items, ...action.photos],
        }
      }
    default:
      return state;
  }
}

export default gallery;