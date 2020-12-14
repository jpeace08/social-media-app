import { gql } from '@apollo/client';

export const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id, 
            body, 
            createdAt, 
            username, 
            comments{
                id,createdAt, username, body
            }
            , likes{
                id,createdAt, username
            }, likeCount, commentCount
        },
    }
`

export const CREATE_POST_MUTATION = gql`
    mutation createPost($body: ID!){
        createPost(body: $body){
            id body createdAt username
            likes{
                id username createdAt
            }
            likeCount
            comments{
                id body username createdAt
            }
        }
    }
`

export const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: String!){
        likePost(postId: $postId){
            id
            likes{
                username
            }
            likeCount
        }
    }
`

export const FETCH_POST_QUERY = gql`
    query ($postId: ID!){
        getPost(postId: $postId){
            id, 
            body, 
            createdAt, 
            username, 
            comments{
                id,createdAt, username, body
            }
            , likes{
                id,createdAt, username
            }, likeCount, commentCount
        }
    }
`

export const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: String!){
        deletePost(postId: $postId)
    }
`

export const DELETE_COMMENT_MUTATION = gql`
    mutation deleteCommnet($postId: ID!, $commentId: String!){
        deleteComment(postId: $postId, commentId: $commentId){
            id
            comments {
                id username createdAt body 
            }
            commentCount
        }
    }
`