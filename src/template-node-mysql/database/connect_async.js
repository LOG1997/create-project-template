const mysql = require("mysql2");
const {
  MYSQL_CONNECT_HOST,
  MYSQL_CONNECT_PORT,
  MYSQL_CONNECT_USER,
  MYSQL_CONNECT_PASSWORD,
  MYSQL_CONNECT_DATABASE,
} = require("../config/sql_connect_config");
const pool = mysql.createPool({
  host: MYSQL_CONNECT_HOST,
  port: MYSQL_CONNECT_PORT,
  user: MYSQL_CONNECT_USER,
  password: MYSQL_CONNECT_PASSWORD,
  database: MYSQL_CONNECT_DATABASE,
});
exports.query = (sql, data) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, data, (error, results) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            resolve(results);
          }
        });
        connection.release();
      }
    });
  });
};
