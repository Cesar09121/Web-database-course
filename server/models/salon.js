const con = require('./db_connect.js');

async function createTable() {
   let sql = `CREATE TABLE IF NOT EXISTS salon (
    salon_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,  
    contract TEXT,  
    address VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);`
   await con.query(sql);
}

async function createSalon(salon) {
   let sql = `INSERT INTO salon (user_id, contract, address) 
   VALUES (${salon.user_id}, "${salon.contract}", "${salon.address}")`;
   await con.query(sql);
}
async function findSalon(salon_id) {
   let sql = `SELECT * FROM salon WHERE salon_id = ${salon_id}`;
    return await con.query(sql);
}
async function getSalons() {
   let sql = `SELECT * FROM salon`;
   return await con.query(sql);
}
async function updateSalon(salon_id, salon,user_id) {
    const ownerCheckSql = `SELECT user_id FROM salon WHERE salon_id = ?`;
    const [salonData] = await con.query(ownerCheckSql, [salon_id]);
    
    if (!salonData) {
        throw Error('Salon not found');
    }
    
    if (salonData.user_id !== user_id) {
        throw Error('Unauthorized: Only salon owner can update information');
    }
    const updateFields = [];
    const params = [];
    if (updates.contract) {
        updateFields.push('contract = ?');
        params.push(updates.contract);
    }
    if (updates.address) {
        updateFields.push('address = ?');
        params.push(updates.address);
    }
    if (updates.name) {
        updateFields.push('name = ?');
        params.push(updates.name);
    }

    params.push(salon_id, user_id);
    const updateSql = `
    UPDATE salon 
    SET ${updateFields.join(', ')}
    WHERE salon_id = ? AND user_id = ?
`;
    await con.query(updateSql, params);
    return { message: 'Salon updated successfully' };
}


module.exports = {
    createTable,
    createSalon,
    findSalon,
    getSalons,
    updateSalon
};