import React, { Component } from "react";

import Button from "../../../shared/UI/Button/Button";

class Comments extends Component {
  state = {
    comment: ""
  };

  onChangeHandler = event => {
    let comment = { ...this.state.comment };

    comment = event.target.value;

    this.setState({
      comment: comment
    });
  };

  render() {
    if (this.props.post.comments.length === 0) {
      return (
        <li className="userInfoList postComment clearfix">
          <input
            type="text"
            className="formControl"
            value={this.state.comment}
            onChange={this.onChangeHandler}
          />
          <Button
            disabled={!this.state.comment}
            clicked={() =>
              this.props.clicked({
                postId: this.props.post._id,
                comment: this.state.comment
              })
            }
            btnType="btn-success"
            type="submit"
          >
            Comment
          </Button>
        </li>
      );
    } else {
      return (
        <li>
          <ul>
            {this.props.post.comments.map((comment, index) => (
              <li className="userInfoList postComment clearfix" key={index}>
                <div className="userImg">
                  <img src="./images/profile-icon.png" width="15" height="15" />
                </div>
                <div className="userInfo">
                  <div>
                    @{comment.creator.email}
                    <span className="userEmail pl-3">{comment.createdAt}</span>
                  </div>
                  <div className="userEmail">
                    Replying to @{this.props.post.creator.email}
                  </div>
                  <div className="userPostInfo">{comment.comment}</div>
                </div>
              </li>
            ))}

            <li className="userInfoList postComment clearfix">
              <input
                type="text"
                className="formControl"
                value={this.state.comment}
                onChange={this.onChangeHandler}
              />
              <Button
                disabled={!this.state.comment}
                clicked={() =>
                  this.props.clicked({
                    postId: this.props.post._id,
                    comment: this.state.comment
                  })
                }
                btnType="btn-success"
                type="submit"
              >
                Comment
              </Button>
            </li>
          </ul>
        </li>
      );
    }
  }
}

export default Comments;
