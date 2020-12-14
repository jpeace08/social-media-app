import React, { useState } from 'react';
import {Button, Confirm, Icon} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {useMutation, gql} from '@apollo/client';
import { DELETE_COMMENT_MUTATION, DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from '../utils/graphql';

function DeleteButton(props) {
    const { postId, callback, commentId } = props;
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const [deletePost] = useMutation(mutation, {
        update(cache) {
            setConfirmOpen(false);
            //TODO: remove post from cache

            if (!commentId) {
                const data = cache.readQuery({ query: FETCH_POSTS_QUERY });
                cache.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: { getPosts: [...data.getPosts.filter(post => post.id !== postId)] }
                });    
            }

            if (callback) callback();
        },
        onError() {
            
        },
        variables: {
            postId,
            commentId
        }
    })

    return (
        <Button as='div' floated='right' color='orange' onClick={()=>setConfirmOpen(true)}>
            <Icon name='trash' style={{ margin: 0 }} />
            <Confirm
                open={confirmOpen}
                onConfirm={deletePost}
                onCancel={() => setConfirmOpen(false)}
            />
        </Button>
    )
}

DeleteButton.propTypes = {
    postId: PropTypes.string.isRequired,
}

export default DeleteButton

