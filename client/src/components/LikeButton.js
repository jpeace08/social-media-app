import React, { useEffect, useState} from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import PropTypes from 'prop-types';
import { LIKE_POST_MUTATION } from '../utils/graphql';

LikeButton.propTypes = {
    user: PropTypes.object,
    post: PropTypes.object.isRequired,
}

LikeButton.defaultValue = {
    user: null,
}

function LikeButton({user, post:{id, likes, likeCount}}) {

    const [liked, setLiked] = useState(false);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId: id}
    });

    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true)
        } else {
            setLiked(false);
        }
        return () => {
        }
    }, [user, likes]);

    const likeButton = user ? (liked ? (
        <Button onClick={likePost} color='teal'>
            <Icon name='heart' />
        </Button>
    ) :
        <Button onClick={likePost} color='teal' basic >
            <Icon name='heart' />
        </Button>
    ) : (
            <Button as={Link} to='/login' color='teal' basic >
            <Icon name='heart' />
        </Button>
    )

    return (
        <Button as='div' labelPosition='right' style={{ marginRight: 5 }}>
            {likeButton}
            <Label basic color='teal' pointing='left'>
                {likeCount}
            </Label>
        </Button>     
    )
}

export default LikeButton

