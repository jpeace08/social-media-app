import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { useForm } from '../utils/hooks';

function Login(props) {

    const [errors, setErrors] = useState({});

    const { values, onSubmit, onChange } = useForm(loginUser, {
        username: '',
        password: '',
    })

    const [login, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, result) {
            props.history.push('/');
        }, //excute when mutation success
        onError(err) {
            setErrors({ err }.err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    //Use normal func to avoid hoisting
    function loginUser() {
        login();
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate loading={loading ? true : false}>
                <h1>Regiter Account</h1>
                <Form.Input
                    name='username'
                    label='Username'
                    placeholder='Username...'
                    onChange={onChange}
                    value={values.name}
                    error={errors.username ? true : false}
                />

                <Form.Input
                    name='password'
                    label='Password'
                    placeholder='Password...'
                    type='password'
                    onChange={onChange}
                    value={values.password}
                    error={errors.password ? true : false}
                />

                <Button
                    type='submit'
                >Login</Button>

            </Form>

            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {
                            Object.values(errors).map(err => (
                                <li key={err}>{err}</li>
                            ))
                        }
                    </ul>
                </div>
            )}
        </div>
    );
}

const LOGIN_USER = gql`
    mutation login(
        $username: String!
        $password: String!
    ){
        login(
                username: $username,
                password: $password,
        ){
            id email username createdAt token
        }
    }
`

export default Login;