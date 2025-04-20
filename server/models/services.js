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

async function createService(service) {
    const sql = `INSERT INTO services (salon_id, service_name, price, duration) VALUES (?, ?, ?, ?)`;
    const params = [service.salon_id, service.service_name, service.price, service.duration];
    await con.query(sql, params);
}

async function updateServiceSummary(service_id, service) {
    const sql = `UPDATE services SET service_name = ?, price = ?, duration = ? WHERE service_id = ?`;
    const params = [service.service_name, service.price, service.duration, service_id];
    await con.query(sql, params);
}

async function deleteService(service_id) {
    const sql = `DELETE FROM services WHERE service_id = ?`;
    await con.query(sql, [service_id]);
}

async function serviceExists(service_name) {
    const sql = `SELECT * FROM services WHERE service_name = ?`;
    return await con.query(sql, [service_name]);
}

module.exports = {
    createTable,
    createService,
    updateServiceSummary,
    deleteService,
    serviceExists,
};