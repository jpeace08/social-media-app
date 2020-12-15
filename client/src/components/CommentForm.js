import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Input } from 'semantic-ui-react';
import {useMutation} from '@apollo/client';
import { CREATE_COMMENT_MUTATION } from '../utils/graphql';

function CommentForm(props) {

    const { user, post :{id, comments, commentCount}, callback}  = props;
    const [comment, setComment] = useState('');
    const [err, setErr] = useState(null);

    const [createComment, { data, loading, error }] = useMutation(CREATE_COMMENT_MUTATION, {
        variables: {
            postId: id, 
            body: comment
        },
        update(proxy, result) {
            setComment('');
        },
        onError(err) {
            setErr(err);
        }
    })

    const handleSubmitComment = e => {
        e.preventDefault();
        if (user) {
            createComment();
            callback(true)
        }
        else callback(false);
    }

    return (
        <Form  onSubmit = {handleSubmitComment}>
            <Input fluid
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder = 'Write your comment...'
            />
            {err && (
                <div className="ui message error">
                    {err}
                </div>
            )}
        </Form>
    )
}

CommentForm.propTypes = {

}

export default CommentForm

