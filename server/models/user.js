const con = require('./db_connect.js');

async function createRoleTable() {
    let sql = `CREATE TABLE IF NOT EXISTS role (
        id INT AUTO_INCREMENT PRIMARY KEY,
        role_name ENUM('customer','owner','technician','admin') NOT NULL UNIQUE
    );`
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
    );`
    await con.query(sql);
}

async function createUserTable() {
    await createRoleTable();
    await createTable();
}

async function userExists(user) {
    const sql = `SELECT * FROM user WHERE username = ? OR email_address = ?`;
    return await con.query(sql, [user.Username, user.Email]);
}

async function getUsers() {
    const sql = `SELECT u.*, r.role_name as role 
                FROM user u 
                JOIN role r ON u.role_id = r.id`;
    return await con.query(sql);
}

async function getUserById(userId) {
    const sql = `SELECT u.*, r.role_name as role 
                FROM user u 
                JOIN role r ON u.role_id = r.id 
                WHERE u.user_id = ?`;
    const [user] = await con.query(sql, [userId]);
    if (!user) throw Error("User not found");
    delete user.password;
    return user;
}

async function register(user) {
 
    const cUser = await userExists(user);
    if (cUser.length > 0) throw Error("Username or email already exists");


    const sql1 = `SELECT id FROM role WHERE role_name = ?`;
    const [role] = await con.query(sql1, [user.Role]);
    if (!role) throw Error("Invalid role");


    const sql2 = `INSERT INTO user (username, password, fullname, email_address, role_id) 
                VALUES (?, ?, ?, ?, ?)`;
    
    await con.query(sql2, [
        user.Username,
        user.Password, 
        user.Fullname,
        user.Email,
        role.id
    ]);


    return await login({username: user.Username, password: user.Password});
}

async function login(user) {
    const sql = `SELECT u.*, r.role_name as role 
                FROM user u 
                JOIN role r ON u.role_id = r.id 
                WHERE u.username = ?`;
    const [result] = await con.query(sql, [user.username]);
    
    if (!result) throw Error("User not found");
    if (result.password !== user.password) throw Error("Wrong password");
 
    delete result.password;
    return result;
}

async function validateUserRole(userId, expectedRole) {
    const sql = `SELECT r.role_name as role 
                FROM user u 
                JOIN role r ON u.role_id = r.id 
                WHERE u.user_id = ?`;
    const [user] = await con.query(sql, [userId]);

    if (!user) throw Error("User not found");
    if (user.role !== expectedRole) {
        throw Error(`Unauthorized: User must be a ${expectedRole}`);
    }
    return true;
}

async function updateUser(userId, updates, currentUserId) {
    if (userId !== currentUserId) {
        throw Error('Unauthorized: Users can only update their own information');
    }

    let roleId = updates.role_id;
    if (updates.role && !updates.role_id) {
        const [role] = await con.query('SELECT id FROM role WHERE role_name = ?', [updates.role]);
        if (role) roleId = role.id;
    }

    const fields = [];
    const params = [];

    if (updates.username) {
        fields.push('username = ?');
        params.push(updates.username);
    }
    if (updates.password) {
        fields.push('password = ?');
        params.push(updates.password);
    }
    if (updates.fullname) {
        fields.push('fullname = ?');
        params.push(updates.fullname);
    }
    if (updates.email) {
        fields.push('email_address = ?');
        params.push(updates.email);
    }
    if (roleId) {
        fields.push('role_id = ?');
        params.push(roleId);
    }


    params.push(userId);

    if (fields.length === 0) {
        throw Error('No fields to update');
    }

    const sql = `UPDATE user SET ${fields.join(', ')} WHERE user_id = ?`;
    await con.query(sql, params);
    

    return await getUserById(userId);
}


async function deleteUser(userId) {
    const sql = `DELETE FROM user WHERE user_id = ?`;
    await con.query(sql, [userId]);
    return { success: true, message: 'User deleted successfully' };
}

module.exports = {
    createRoleTable,
    createTable,
    createUserTable,
    userExists,
    getUsers,
    getUserById,
    register,
    login,
    validateUserRole,
    updateUser,
    deleteUser
};