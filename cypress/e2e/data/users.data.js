module.exports = {
    user1: {
        firstname: 'John',
        lastname: 'Doe',
        postal: '00000',
        errorMsg: ''
    },
    user2: {
        firstname: '',
        lastname: 'Doe',
        postal: '00000',
        errorMsg: 'Error: First Name is required'
    },
    user3: {
        firstname: 'John',
        lastname: '',
        postal: '00000',
        errorMsg: 'Error: Last Name is required'
    },
    user4: {
        firstname: 'John',
        lastname: 'Doe',
        postal: '',
        errorMsg: 'Error: Postal Code is required'
    },
    user5: {
        firstname: '',
        lastname: '',
        postal: '',
        errorMsg: 'Error: First Name is required'
    }
}