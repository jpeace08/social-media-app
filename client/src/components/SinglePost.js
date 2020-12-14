import React, {useContext} from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Card, Image, Button, Icon, Label, Grid } from 'semantic-ui-react';
import moment from 'moment';

import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

import { FETCH_POST_QUERY } from '../utils/graphql';
import { AuthContext } from '../context/auth';

const SinglePost = (props) => {

    const { postId } = useParams();
    const { user } = useContext(AuthContext);

    const {loading, error, data} = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId,
        }
    });

    const deletePostCallback = () => {
        props.history.push('/');
    }

    if (loading) return (
        <h4>Loading...</h4>
    )
    if (data !== undefined) {
        const { getPost: { id, createdAt, body, username, comments, likes, commentCount, likeCount } } = data;
        const postMarker = (
            <Grid>
                <Grid.Row>
                    <Grid.Column>
                        <Card fluid>
                            <Card.Content>
                                <Image
                                    floated='right'
                                    size='tiny'
                                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                                />
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>

                            <Card.Content>
                                <LikeButton user={user} post={{ id, likes, likeCount }} />
                                <Button as='div' labelPosition='right'>
                                    <Button color='blue'>
                                        <Icon name='comments' /></Button>
                                    <Label as='a' basic color='blue' pointing='left'>
                                        {commentCount}
                                    </Label>
                                </Button>

                                {user && user.username === username && (
                                    <DeleteButton postId={id} callback={deletePostCallback} />
                                )}
                            </Card.Content>
                        </Card>

                        {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === username && (
                                        <DeleteButton postId={id} commentId={comment.id}/>
                                    )}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow(true)}</Card.Meta>
                                    <Card.Description>{ comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
        return postMarker;
    }
    if (error) {
        return (
            <div className="ui message error">
                {error}
            </div>
        )
    }
};

export default SinglePost;
