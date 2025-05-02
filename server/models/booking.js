const con = require('./db_connect.js');

async function createTable() {
    let sql = `CREATE TABLE IF NOT EXISTS booking (
        booking_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    salon_id INT,
    service_id INT,
    date_and_time DATETIME NOT NULL,
	status ENUM('pending', 'confirmed', 'rolesidrole_namecompleted', 'cancelled') NOT NULL DEFAULT 'pending',
    FOREIGN KEY (service_id) REFERENCES service(service_id) ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
	FOREIGN KEY (salon_id) REFERENCES salon(salon_id) ON DELETE CASCADE
    );`
    await con.query(sql);
}

async function createBooking(booking) {
    let sql = `INSERT INTO booking (user_id, salon_id, service_id, date_and_time, status) 
    VALUES (${booking.user_id}, ${booking.salon_id}, ${booking.service_id}, "${booking.date_and_time}", "${booking.status}")`;
    await con.query(sql);
}

async function getBookings() {
    let sql = `SELECT * FROM booking`;
    return await con.query(sql);
}
async function getBookingById(booking_id) {
    let sql = `SELECT * FROM booking WHERE booking_id = ${booking_id}`;
    return await con.query(sql);
}
async function bookingTimes(booking_id) {
    let sql = `SELECT date_and_time FROM booking WHERE booking_id = ${booking_id}`;
    return await con.query(sql);
}
async function updateBooking(booking_id, booking) {
    let sql = `UPDATE booking SET user_id = ${booking.user_id}, salon_id = ${booking.salon_id}, service_id = ${booking.service_id}, date_and_time = "${booking.date_and_time}", status = "${booking.status}" WHERE booking_id = ${booking_id}`;
    await con.query(sql);
}
async function deleteBooking(booking_id) {
    let sql = `DELETE FROM booking WHERE booking_id = ${booking_id}`;
    await con.query(sql);
}


module.exports = {
    createTable,
    createBooking,
    getBookings,
    getBookingById,
    bookingTimes,
    updateBooking,
    deleteBooking
};