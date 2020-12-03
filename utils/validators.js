module.exports.validatorRegisterInput = (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty'
    }
    if(email.trim() === ''){
        errors.username = 'Email must not be empty'
    }
    else {
        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!email.match(regEx)){
            errors.email = 'Email must be valid email addess';
        }
    }
    if(password.trim() === ''){
        errors.password = 'Password must not be empty';
    }
    else if(password.trim() !== confirmPassword){
        errors.confirmPassword = 'Password must match';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validatorLoginInput = (
    username,
    password
) => {
    const errors = {};
    if(username.trim() === ''){
        errors.username = 'Username must not be empty'
    }

    if(password.trim() === ''){
        errors.password = 'Password must not be empty';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}