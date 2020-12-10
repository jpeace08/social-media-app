import React, {useContext} from 'react';
import { gql, useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react'

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

import {AuthContext} from '../context/auth';

function Home(props) {

    const { user } = useContext(AuthContext);

    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    if (data) {
        const { getPosts: posts } = data;
        return (
            <Grid columns='three'>
                <Grid.Row className='page-title'>
                    Recent posts
                </Grid.Row>
                <Grid.Row>

                    {user && (
                        <Grid.Column>
                            <PostForm/>
                        </Grid.Column>
                    )}

                    {
                        loading ? (
                            <h3>Loading post...</h3>
                        ) : (
                                posts && posts.map(post => (
                                    <Grid.Column key={post.id} style={{marginBottom: 20}}>
                                        <PostCard post={post} />
                                    </Grid.Column>
                                ))
                            )
                    }
                </Grid.Row>
            </Grid>
        );
    }
    if(loading) return <h4>Loading post...</h4>
    
}

const FETCH_POSTS_QUERY = gql`
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

export default React.memo(Home);