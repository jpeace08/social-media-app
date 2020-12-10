import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useForm } from '../utils/hooks';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

const PostForm = () => {

    const {values, onChange, onSubmit} = useForm(createPostCallBack, {
        body: '',
    })

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            console.log(result);
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

const CREATE_POST_MUTATION = gql`
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

export default PostForm;
