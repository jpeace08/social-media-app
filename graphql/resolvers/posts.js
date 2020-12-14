const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');
const {AuthenticationError} = require('apollo-server');

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find().sort({createdAt:-1});
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
        getPost: async (_, {postId}, context) => {
            try {
                const post = await Post.findById(postId);
                if(post) return post;
                else throw new Error('Post not found!');
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        createPost: async (_,{body}, context) => {
            const user = checkAuth(context);

            if(body.trim() === ''){
                throw new Error('Post body must not be empty!');
            }

            // console.log(context);
            const newPost = new Post({
                body, 
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save(); 

            context.pubsub.publish('NEW_POST', {
                newPost: post
            });

            return post;
        },
        deletePost: async (_, {postId}, context) => {
            const user = checkAuth(context);
            try {
                const post = await Post.findById(postId);
                if(user.username === post.username){
                    await post.delete();
                    return 'Post deleted successfully!';
                }
                else {
                    throw new AuthenticationError ('Action not allowed!');
                }
            } catch (error) {
                throw new Error(error);   
            }
        }
    },
    Subcription: {
        newPost: {
            subcribe: (_, __, {pubsub}) => pubsub.asyncIterator('NEW_POST')
        }
    }
}