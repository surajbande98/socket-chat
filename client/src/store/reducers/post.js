import * as actionTypes from "../actions/actionTypes";

import { updateObject } from "../../shared/utility/utility";
import { stat } from "fs";

const initialState = {
  loading: false,
  error: null,
  posts: []
};

const loaderStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const responseFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const createPostStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const createPostSuccess = (state, action) => {
  const currentPosts = [...state.posts];

  currentPosts.unshift(action.payLoad);

  return updateObject(state, {
    posts: currentPosts,
    loading: false
  });
};

const createPostFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
};

const getPostsSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    posts: action.posts
  });
};

const createCommentSuccess = (state, action) => {

  const postsCopy  = JSON.parse(JSON.stringify(state.posts));

  const updatedPost = {...action.payLoad};

  const isPostIndex = postsCopy.findIndex(post => post._id === updatedPost._id);

  if(isPostIndex > -1) {
    postsCopy[isPostIndex] = updatedPost;
  }

  return updateObject(state, {
    loading: false,
    posts: postsCopy
  });
};

const deletePostSuccess = (state, action) => {

  const postsCopy = JSON.parse(JSON.stringify(state.posts));

  const postId = action.payLoad;

  const isPostIndex = postsCopy.findIndex(post => post._id === postId);
  
  if(isPostIndex > -1) {
    postsCopy.splice(isPostIndex, 1);
  }

  return updateObject(state, {
    loading: false,
    posts: postsCopy
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADER_START:
      return loaderStart(state, action);
    case actionTypes.RESPONSE_FAIL:
      return responseFail(state, action);
    case actionTypes.CREATE_POST_START:
      return createPostStart(state, action);
    case actionTypes.CREATE_POST_SUCCESS:
      return createPostSuccess(state, action);
    case actionTypes.CREATE_POST_FAIL:
      return createPostFail(state, action);
    case actionTypes.GET_POSTS:
      return getPostsSuccess(state, action);
    case actionTypes.CREATE_COMMENT_SUCCESS:
      return createCommentSuccess(state, action);
    case actionTypes.DELETE_POST_SUCCESS:
      return deletePostSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
