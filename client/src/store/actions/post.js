import * as actionTypes from "./actionTypes";

import postService from "../../services/Post/post.service";

export const createPostStart = () => {
  return {
    type: actionTypes.CREATE_POST_START
  };
};

export const loaderStart = () => {
  return {
    type: actionTypes.LOADER_START
  };
};

export const responseFail = (error) => {
  return {
    type: actionTypes.RESPONSE_FAIL,
    error: error
  };
};

export const createPostSuccess = (postData) => {
  return {
    type: actionTypes.CREATE_POST_SUCCESS,
    payLoad: postData
  };
};

export const getPostSuccess = (posts) => {
  return {
    type: actionTypes.GET_POSTS,
    posts: posts
  };
};

export const createCommentSuccess = (commentData) => {
  return {
    type: actionTypes.CREATE_COMMENT_SUCCESS,
    payLoad: commentData
  };
};

export const createPostFail = error => {
  return {
    type: actionTypes.CREATE_POST_FAIL,
    error: error
  };
};

export const deletePostSuccess = (postId) => {
  return {
    type: actionTypes.DELETE_POST_SUCCESS,
    payLoad: postId
  }
};

export const deletePostFail = (error) => {
  return {
    type: actionTypes.CREATE_POST_FAIL,
    error: error
  };
};

export const create = (data) => {
  return dispatch => {
    dispatch(createPostStart());

    postService
      .create(data)
      .then(res => {
        //dispatch(createPostSuccess(res.data));
      })
      .catch(err => {
        alert(err.response.data.message);
        dispatch(createPostFail(err.response.data.message));
      });
  };
};

export const get = () => {
  return dispatch => {
    dispatch(loaderStart());

    postService
      .get()
      .then(res => {
        const posts = res.data.posts;
        dispatch(getPostSuccess(posts));
      })
      .catch(err => {
        alert(err.response.data.message);
        dispatch(responseFail(err.response.data.message));
      });
  };
};

export const createComment = (payLoad) => {
  return dispatch => {
    dispatch(loaderStart());

    postService
      .createComment(payLoad)
      .then(res => {
       //dispatch(createCommentSuccess(res.data.post))
      })
      .catch(err => {
        alert(err.response.data.message);
        dispatch(responseFail(err.response.data.message));
      });
  };
};

export const deletePost = (postId) => {
  return dispatch => {
    dispatch(loaderStart());

    postService
      .deletePost(postId)
      .then(res => {
        //dispatch(deletePostSuccess(postId));
      })
      .catch(err => {
        alert(err.response.data.message);
        dispatch(responseFail(err.response.data.message));
      })
  }
};