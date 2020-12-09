import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react'

import PostCard from '../components/PostCard';

function Home(props) {

    const { loading, data: {getPosts : posts} } = useQuery(FETCH_POSTS_QUERY);

    return (
        <Grid columns='three'>
            <Grid.Row>
                Recent posts
            </Grid.Row>
            <Grid.Row>
                {
                    loading ? (
                        <h3>Loading post...</h3>
                    ) : (
                        posts && posts.map(post => (
                            <Grid.Column key={post.id}>
                                <PostCard post={ post }/>
                            </Grid.Column>
                        ))
                    )
                }
            </Grid.Row>
        </Grid>
    );
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts{
            id body createdAt username likeCount
            likes {
                username
            }
            commentCount
            comments {
                id username createdAt body
            }
        }
    }
`;

export default Home;