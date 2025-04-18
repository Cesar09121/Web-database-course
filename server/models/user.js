
const con = require('./db_connect.js');

async function createRoleTable() {
    let sql = `CREATE TABLE IF NOT EXISTS role (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE
    );`
    await con.query(sql);
}

async function createTable() {
    let sql = `CREATE TABLE IF NOT EXISTS user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    fullname VARCHAR(50) NOT NULL UNIQUE,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE RESTRICT
};`
    await con.query(sql);
}
async function login(user){
    let cUser = await getUser(user.username);
    if(!cUser[0]) throw new Error("User not found");
    if(cUser.password[0] !== user.password) throw new Error("Wrong password");
    return cUser[0];
}

async function createUserTable() {
    await createRoleTable()
    await createTable()
}
async function getUsers() {
    let sql = `SELECT * FROM User`
    return await con.query(sql)
  }

const user = {
    Username :"cesar",
    Email: "a@a",
    Password: "123456",
    Fullname: "Cesar Le",
    Role: "Admin"
}

async function register(user){
    const cUser = userExists(user);
    if(cUser.length>0) throw Error("User already exists")

        let sql = 
        `INSERT INTO user (username, password, fullname, role_id) 
        VALUES ("${user.Password}"), "${user.Password}","${user.Email}", "${user.Fullname}", "${user.Role}")`

        await con.query(sql)

        return await login(user)  
    
}
  
  module.exports = { 
    getUsers,
    createTable,
    createUserTable,
    login,register
  };











/* const users = [{
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
module.exports = router; */

