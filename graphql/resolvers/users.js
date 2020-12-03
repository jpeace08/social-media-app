const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../../config');
const {UserInputError} = require('apollo-server');
const {validatorRegisterInput, validatorLoginInput} = require('../../utils/validators');

const generateToken = (user) => jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username
},SECRET_KEY, {expiresIn: '1h'} );

module.exports = {
    Query: {

    },
    Mutation: {
        register: async (_, {registerInput: {username, password, confirmPassword, email}}, context, info) => {
            //TODO: validate user data
            const {errors, valid} = validatorRegisterInput(username, email, password, confirmPassword);
            if(!valid){
                throw new UserInputError('Errors', {errors});
            }

            //TODO: Make sure user doesnt already exist
            const user = await User.findOne({username});
            if(user) {
                throw new UserInputError('User name taken', {
                    errors:{
                        username: 'This username is taken'
                    }
                })
            }

            //TODO: hash password and create auth token
            password = await bcrypt.hash(password, 12);
            const newUser = User({
                username,
                password,
                email,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            }

        },

        login: async (_, {username, password}) => {
            const {errors, valid}  = validatorLoginInput(username, password);
            const user = await User.findOne({username});

            if(!valid){
                throw new UserInputError('Errors', {errors});
            }

            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('User not found', {errors});
            }
            const match = bcrypt.compare(password, user.password);
            if(!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', {errors});
            }

            const token = generateToken(user);

            return {
                id: user._id,
                token,
                ...user._doc
            }
        }
    }
}