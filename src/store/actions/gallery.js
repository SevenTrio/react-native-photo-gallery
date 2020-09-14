/* ACTION TYPES */

export const REQUEST_PHOTOS = 'REQUEST_PHOTOS';
export const RECEIVE_PHOTOS = 'RECEIVE_PHOTOS';
export const FETCHING_ERROR = 'FETCHING_ERROR';

/* ACTIONS */

export const fetchingError = () => ({
  type: FETCHING_ERROR,
})

export const requestPhotos = () => ({
  type: REQUEST_PHOTOS,
})

export const receivePhotos = (json) => ({
  type: RECEIVE_PHOTOS,
  photos: json,
})

export const fetchPhotos = () => (dispatch, getState) => {
  dispatch(requestPhotos())
  const state = getState();
  const page = state.gallery.page;
  const per_page = state.gallery.per_page;

  return fetch(`https://api.unsplash.com/photos/?page=${page}&per_page=${per_page}&client_id=cf49c08b444ff4cb9e4d126b7e9f7513ba1ee58de7906e4360afc1a33d1bf4c0`)
    .then(response => {
      return response.json();
    })
    .then(json => {
      if (json.errors) {
        console.log(json.errors);
        return dispatch(fetchingError());
      } else {
        return dispatch(receivePhotos(json));
      }
    })
    .catch(error => {
      console.log(error);
      return dispatch(fetchingError())
    })
}