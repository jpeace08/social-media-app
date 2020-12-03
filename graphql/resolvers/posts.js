const Post = require('../../models/Post');

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                const posts = await Post.find();
                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },
        getPost: async (id) => {
            try {
                const post = await Post.findById('id');
                if(post) return post;
                else throw new Error('Post not found!');
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}