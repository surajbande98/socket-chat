// post controller

const mongoose = require("mongoose");

const { validationResult } = require("express-validator/check");

//Get socket io server instance
const io = require("../socket");

const { Post } = require("../models/post");

const { Comment } = require("../models/post");

const utilityService = require("../utility/utility.service");

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);

  // if validation fails
  if (!errors.isEmpty()) {
    utilityService.throwError(errors);
  }

  const postAdded = req.body.post;

  const post = new Post({
    post: postAdded,
    creator: req.userId
  });

  post
    .save()
    .then(newPost => {
      if (!newPost) {
        res.status(404).json({
          message: "Post can not created!!"
        });
      }
      return Post.findById({ _id: newPost._id })
        .populate("creator", "-password")
        .exec();
    })
    .then(result => {
      //CREATE_POST => channel
      //{action, data} => data packet
      
      io.getIO().emit('posts', {action: 'create', post: result});
      
      res.status(201).json({
        message: "Post created!!",
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next();
    });
};

exports.getPosts = (req, res, next) => {
  Post.find()
    .populate({ path: "creator", select: "-password" })
    .populate({path:'comments.creator', select:"-password"})
    .sort({ createdAt: -1 })
    .then(posts => {
      res.status(200).json({
        message: "Fetched post successfully.",
        posts: posts
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next();
    });
};

exports.createComment = (req, res, next) => {
  const errors = validationResult(req);

  // if validation fails
  if (!errors.isEmpty()) {
    utilityService.throwError(errors);
  }

  const postId = req.params.id;

  const commentAdded = req.body.comment;

  const comment = new Comment({
    comment: commentAdded,
    creator: req.userId
  });

  Post.findByIdAndUpdate(
    { _id: mongoose.Types.ObjectId(postId) },
    { $push: { comments: comment } },
    { new: true }
  )
    .populate("creator", "-password")
    .populate({ path: "comments.creator", select: "-password" })
    .exec()
    .then(result => {
      if (!result) {
        res.status(404).send({
          message: "Comment can not created!!"
        });
      }
      
      io.getIO().emit('posts', {action: 'commentCreate', post: result});
      
      res.status(201).send({
        message: "Comment created!!!",
        post: result
      });
    })
    .catch(error => {
      if (!error) {
        error.statusCode = 500;
      }
      next();
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.id;

  if (!postId) {
    res.status(422).json({
      message: "validation failed!!"
    });
  }

  Post.findById(postId)
    .then(post => {
      if(post.creator.toString() !== req.userId) {
        const error = new Error('Not authorized!');
        error.statusCode = 403;
        throw error;
      }

      return Post.findByIdAndRemove(postId);
    })
    .then(result => {
      io.getIO().emit('posts', {action: 'delete', postId: postId});

      res.status(200).send({
        message: "Post deleted !!!"
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }

      next();
    });
};
