import gql from 'graphql-tag';
import React, {useState} from 'react';
import { Button, Form } from 'semantic-ui-react';
import {useMutation} from '@apollo/client';

import { useForm } from '../utils/hooks';

function Register(props) {

    const [errors, setErrors] = useState({});

    const { values, onSubmit, onChange } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [addUser,{ loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            props.history.push('/');
        }, //excute when mutation success
        onError(err) {
            setErrors({ err }.err.graphQLErrors[0].extensions.errors);
        },
        variables: values
    });

    //Use normal func to avoid hoisting
    function registerUser () {
        addUser();
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate loading={loading? true : false}>
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
                    name='email'
                    label='Email'
                    placeholder='Email...'
                    onChange={onChange}
                    value={values.email}
                    error={errors.email ? true : false}
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
                <Form.Input
                    name='confirmPassword'
                    label='Confirm Password'
                    placeholder='Confirm password...'
                    onChange={onChange}
                    value={values.confirmPassword}
                    type='password'
                    error={errors.confirmPassword ? true : false}
                />
                
                <Button
                    type='submit'
                >Register</Button>

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

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput: {
                username: $username,
                email: $email,
                password: $password,
                confirmPassword: $confirmPassword
            }
        ){
            id email username createdAt token
        }
    }
`

export default Register;