const Post = require('../../models/Post');
const {UserInputError, AuthenticationError} = require('apollo-server'); 
const checkAuth = require('../../utils/check-auth');

module.exports = {
    Mutation: {
        createComment: async (_, {postId, body}, context, info) => {
            const {username} = checkAuth(context);

            if(body.trim() === '') throw new UserInputError('Errors comment', {
                errors:{
                    body: 'Comment body must not be empty!'
                }
            });

            const post = await Post.findById(postId);
            
            if(post) {
                post.comments.unshift({
                    body, 
                    username,
                    createdAt: new Date().toISOString()
                })
                await post.save();
                return post;
            }
            throw new UserInputError('Post not found!');
        },
        deleteComment: async (_, {postId, commentId}, context, info) => {
            const {username} = checkAuth(context);
            const post = await Post.findById(postId);
            
            if(post) {
                const commentIndex = post.comments.findIndex (c => c.id === commentId);
                if(post.comments[commentIndex].username === username) {
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                }
                else {
                    throw new AuthenticationError('Action not allowed!');
                }
            }
            else {
                throw new UserInputError ('Post not found!');
            }
        },
        likePost: async (_, {postId}, context, info) =>{
            const {username} = checkAuth(context);

            const post = await Post.findById(postId);
            if(post) {
                //TODO: post liked, unlike
                if(post.likes.find(like => like.username === username)) {
                    post.likes = post.likes.filter (like => like  .username !== username);
                }   
                //TODO: not liked, like post
                else {
                    post.likes.push ({
                        username,
                        createdAt: new Date().toISOString()
                    });
                }
                (await post).save();
                return post;
            }
            else {
                throw new UserInputError('Post not found!');
            }
        }
    }
}