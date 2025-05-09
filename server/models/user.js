const con = require('./db_connect.js');

async function createRoleTable() {
    let sql = `CREATE TABLE IF NOT EXISTS role (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role_name ENUM('customer','owner','technician','admin') NOT NULL UNIQUE
    )`;
    await con.query(sql);
  
    const roles = ['customer', 'owner', 'technician', 'admin'];
    for (let role of roles) {
        await con.query('INSERT IGNORE INTO role (role_name) VALUES (?)', [role]);
    }
}

async function createTable() {
    let sql = `CREATE TABLE IF NOT EXISTS user (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(50) NOT NULL,
        fullname VARCHAR(50) NOT NULL UNIQUE,
        email_address VARCHAR(50) NOT NULL UNIQUE,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        role_id INT NOT NULL,
        FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE RESTRICT
    )`;
    await con.query(sql);
}

async function createUserTable() {
    await createRoleTable();
    await createTable();
}

async function getAllUsers() {
    let sql = `SELECT * FROM User`
    return await con.query(sql)
}
async function userExists(user) {
    let sql = `SELECT * FROM user WHERE username = ? OR email_address = ?`;
    const [result] = await con.query(sql, [user.Username, user.Email]);
    return result;
}

async function register(user) {
    console.log('Created user:', user);
 
    const cUser = await userExists(user);
    if (cUser) throw Error("Username or email already exists");

    const sql1 = `SELECT id FROM role WHERE role_name = ?`;
    const [roleResult] = await con.query(sql1, [user.Role]);
    if (!roleResult) throw Error("Invalid role");

    const sql2 = `INSERT INTO user (username, password, fullname, email_address, role_id) 
                VALUES (?, ?, ?, ?, ?)`;
    
    await con.query(sql2, [
        user.Username,
        user.Password, 
        user.Fullname,
        user.Email,
        roleResult.id
    ]);

    return await login({username: user.Username, password: user.Password});
}

async function login(user) {    
    console.log(user)
    let sql = `SELECT * FROM user WHERE username="${user.username}" `;
    const cUser = await con.query(sql)
    console.log(cUser[0])
    if(!cUser[0]) throw Error("User not found"); 
    if(cUser[0].password!= user.password) throw Error("Invalid password");
    return cUser[0]

}

async function updateUser(user) {
    let sql = `UPDATE user SET 
    username = "${user.username}",
    password = "${user.password}",
    WHERE user_id = ${user.userId}`

    await con.query(sql)
    const currentUser = await userExists(user)
    return currentUser[0]
}

async function deleteUser(user) {
    let sql = 
      `DELETE FROM user
      WHERE userId = ${user.userId}`
    await con.query(sql)
}

async function getUserById(userId) {
    let sql = `SELECT * FROM user WHERE user_id = ?`;
    const [result] = await con.query(sql, [userId]);
    return result;
}

module.exports = {
    createRoleTable,
    createTable,
    createUserTable,
    getAllUsers,
    userExists,
    register,
    login,
    deleteUser,
    getUserById
};