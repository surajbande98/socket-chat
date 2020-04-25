import React, { Component } from "react";

import openSocket from 'socket.io-client';

import { connect } from "react-redux";

import CreatePost from "../../components/Posts/CreatePost/CreatePost";

import Post from "../../components/Posts/Post/Post";

import Comments from "../../components/Posts/Comments/Comments";

import * as actions from "../../store/actions/index";

import Aux from "../../hoc/Aux/Aux";

import Spinner from "../../shared/UI/Spinner/Spinner";

import classes from "./Post.module.css";

class PostComponent extends Component {
  componentDidMount() {
    this.props.getUserPosts();

    this.initSocketConnection();
  }

  initSocketConnection() {
    // Socket code
    const socket = openSocket("http://localhost:8080");

    socket.on("posts", data => {
      if (data.action === "create") {
        this.props.addPost(data.post);
      } else if (data.action === "delete") {
        this.props.removePost(data.postId);
      } else if (data.action === "commentCreate") {
        this.props.updatePost(data.post);
      }
    });
  }

  render() {
    //Object De-structuring
    const { posts } = this.props;

    let postsHtml = <Spinner />;

    if (!this.props.loading) {
      postsHtml = (
        <div className="userPostWrapper">
          <ul>
            {posts.map((post, index) => (
              <Aux key={index}>
                <Post post={post} clicked={this.props.deletePost} />
                <Comments post={post} clicked={this.props.createComment} />
              </Aux>
            ))}
          </ul>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="wrapper">
          <div className="writePostWrapper">
            <CreatePost />
          </div>
          {postsHtml}
          {this.props.posts.length === 0 && !this.props.loading && (
            <p className={classes.notFound}>No post found. Please add one!!</p>
          )}
        </div>
        {this.props.error && <p className="danger-text">{this.props.error}</p>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.post.error,
    posts: state.post.posts,
    loading: state.post.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserPosts: () => dispatch(actions.getPosts()),
    deletePost: postId => dispatch(actions.deletePost(postId)),
    createComment: commentData => dispatch(actions.createComment(commentData)),

    addPost: postData => dispatch(actions.createPostSuccess(postData)),
    updatePost: postData => dispatch(actions.createCommentSuccess(postData)),
    removePost: postData => dispatch(actions.deletePostSuccess(postData))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostComponent);
