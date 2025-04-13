const users = [{
    userId: 1,
    username: 'user1',
    password: 'password1'
}
]


function getAllUsers() {
    return users;
}

function login(username, password) {
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        return { success: true, message: 'Login successful' };
    } else {
        return { success: false, message: 'Invalid username or password' };
    }
}
module.exports = {
    getAllUsers,
    login
};
module.exports = router;