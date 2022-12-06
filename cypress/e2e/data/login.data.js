module.exports = {
    standardUser: {
        username: 'standard_user',
        password: 'secret_sauce',
        errorMsg: ''
    },
    lockedOutUser: {
        username: 'locked_out_user',
        password: 'secret_sauce',
        errorMsg: 'Sorry, this user has been locked out.'
    },
    problemUser: {
        username: 'problem_user',
        password: 'secret_sauce',
        errorMsg: ''
    },
    performanceGlitchUser: {
        username: 'performance_glitch_user',
        password: 'secret_sauce',
        errorMsg: ''
    },
    missingUsername: {
        username: '',
        password: 'secret_sauce',
        errorMsg: 'Username is required'
    },
    missingPassword: {
        username: 'standard_user',
        password: '',
        errorMsg: 'Password is required'
    },
    missingData: {
        username: '',
        password: '',
        errorMsg: 'Username is required'
    }
}