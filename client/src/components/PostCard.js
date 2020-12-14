import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Label, Image, Button, ButtonGroup } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from './DeleteButton';

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
};

function PostCard({ post: {id, body, username, createdAt, likes, likeCount, comments, commentCount} }) {

    const { user } = useContext(AuthContext);

    const commentPost = () => {

    }

    return (
        <Card fluid>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>{ username }</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{ moment(createdAt).fromNow(true) }</Card.Meta>
                <Card.Description>
                    { body }
                </Card.Description>
            </Card.Content>
            <Card.Content>
                <ButtonGroup>
                    <LikeButton user={user} post={{id, likes, likeCount}}/>

                    <Button as='div' labelPosition='right'>
                        <Button color='blue' basic onClick={commentPost}>
                            <Icon name='comments' />
                        </Button>
                        <Label basic color='teal' pointing='left'>
                            {commentCount}
                        </Label>
                    </Button>

                </ButtonGroup>

                {user && user.username === username && (
                    <DeleteButton postId={id}/>
                )}
            </Card.Content>
        </Card>
    );
}

export default PostCard;