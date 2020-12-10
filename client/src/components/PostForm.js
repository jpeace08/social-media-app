import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useForm } from '../utils/hooks';
import { useMutation } from '@apollo/client';

import {CREATE_POST_MUTATION, FETCH_POSTS_QUERY} from '../utils/graphql';

const PostForm = () => {

    const {values, onChange, onSubmit} = useForm(createPostCallBack, {
        body: '',
    })

    const [createPost, ] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(cache, result) {

            const data = cache.readQuery({ query: FETCH_POSTS_QUERY });
            cache.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: { getPosts: [result.data.createPost, ...data.getPosts] }
            });
            values.body = '';
           
        }
    });

    function createPostCallBack() { 
        createPost();
     }

    return (
        <Form onSubmit={onSubmit}>
            <h2>Create new post:</h2>
            <Form.Field>
                <Form.Input
                    placeholder='Hi world!'
                    name='body'
                    values={values.body}
                    onChange={onChange}
                />

                <Button type='submit' color='teal'>
                    Up now!
                </Button>
            </Form.Field>
        </Form>
    );
};


export default PostForm;
