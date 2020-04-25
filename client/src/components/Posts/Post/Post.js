import React from 'react';

const Post = (props) => {

    let post = props.post;

    return (
        <li className="userInfoList clearfix">
        <div className="userImg">
          <img
            src="./images/profile-icon.png"
            alt="profile"
            height="42px"
            width="42px"
          />
        </div>
        <div className="userInfo">
          <div className="userName">
            {post.creator.firstName + " " + post.creator.lastName}
          </div>
          <img
            className="cursor-pointer"
            title="delete post"
            src="./images/delete-16.png"
            alt="delete post"
            onClick={() => props.clicked(post._id)}
          />
          <div className="userEmail">@{post.creator.email}</div>
          <div className="userPostInfo">
            <p>{post.post}</p>
            <p className="userEmail">{post.createdAt}</p>
          </div>
        </div>
      </li>
    );
};

export default Post;