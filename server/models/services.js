const con = require('./db_connect.js');

async function createTable() {
    let sql = `CREATE TABLE IF NOT EXISTS services (
        service_id INT AUTO_INCREMENT PRIMARY KEY,
        salon_id INT NOT NULL,
        user_id INT,
        service_name VARCHAR(50) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        duration INT NOT NULL,
        FOREIGN KEY (salon_id) REFERENCES salon(salon_id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE SET NULL
    );`
    await con.query(sql);
}

async function getAllServices() {
    let sql = `SELECT * FROM services`;
    return await con.query(sql);
}

async function getService(service_id) {
    let sql = `SELECT * FROM services WHERE service_id = ?`;
    return await con.query(sql, [service_id]);
}

async function createService(service) {
    const sql = `INSERT INTO services (salon_id, service_name, price, duration) VALUES (?, ?, ?, ?)`;
    const params = [service.salon_id, service.service_name, service.price, service.duration];
    await con.query(sql, params);
}

async function updateService(service_id, service) {
    const sql = `UPDATE services SET service_name = ?, price = ?, duration = ? WHERE service_id = ?`;
    const params = [service.service_name, service.price, service.duration, service_id];
    await con.query(sql, params);
}

async function updateServiceSummary(service_id, updates) {

    let sql = 'UPDATE services SET ';
    const params = [];
    const updateFields = [];

    if (updates.service_name !== undefined) {
        updateFields.push('service_name = ?');
        params.push(updates.service_name);
    }
    
    if (updates.price !== undefined) {
        updateFields.push('price = ?');
        params.push(updates.price);
    }
    
    if (updates.duration !== undefined) {
        updateFields.push('duration = ?');
        params.push(updates.duration);
    }
    if (updateFields.length === 0) {
        return;
    }

    sql += updateFields.join(', ') + ' WHERE service_id = ?';
    params.push(service_id);

    await con.query(sql, params);
}

async function deleteService(service_id) {
    const sql = `DELETE FROM services WHERE service_id = ?`;
    await con.query(sql, [service_id]);
}

async function serviceExists(service_name) {
    const sql = `SELECT * FROM services WHERE service_name = ?`;
    const result = await con.query(sql, [service_name]);
    return result.length > 0;
}

module.exports = {
    createTable,
    getAllServices,
    getService,
    createService,
    updateService,
    updateServiceSummary,
    deleteService,
    serviceExists
};