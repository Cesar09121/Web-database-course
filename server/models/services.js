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
};
