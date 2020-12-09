import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Label, Image, Button, ButtonGroup } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

PostCard.propTypes = {
    post: PropTypes.object.isRequired,
};

function PostCard({ post: {id, body, username, createdAt, likes, likeCount, comments, commentCount} }) {

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
                <ButtonGroup>
                    <Button color='linkedin'>Button here</Button>
                </ButtonGroup>
            </Card.Content>
        </Card>
    );
}

export default PostCard;