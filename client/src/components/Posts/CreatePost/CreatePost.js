import React, { Component } from "react";

import Button from "../../../shared/UI/Button/Button";

import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";

class CreatePost extends Component {
  state = {
    post: '',
    isFormValid: false
  };

  inputChangeHandler = (event) => {
    const enteredPost = {};
    enteredPost[event.target.name] = event.target.value;

    this.setState({
        ...enteredPost,
      isFormValid: event.target.value.length > 0
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();

    if (!this.state.isFormValid) {
      return false;
    }

    this.props.onCreatePost({post: this.state.post});

    this.setState({
        post: '',
        isFormValid: false
    });

  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmitHandler}>
          <label>Write Your Post</label>
          <input
            type="text"
            name="post"
            className="formControl"
            value={this.state.post}
            onChange={this.inputChangeHandler}
          />
          <Button
            disabled={!this.state.isFormValid}
            btnType="btn-success"
            type="submit"
          >
            Post
          </Button>
        </form>
      </div>
    );
  }
}

// map state, dispatch to props

const mapStateToProps = state => {
  return {
    error: state.post.error,
    loading: state.post.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCreatePost: post => dispatch(actions.createPost(post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost);
