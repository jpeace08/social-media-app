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
    mutation createPost($body: String!){
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