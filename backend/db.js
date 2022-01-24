const mysql = require('mysql2/promise');
const dbConfig  = require('./config/dbConfig.js');

// Se crea pool de mysql para poder correr queries
const pool = mysql.createPool(dbConfig);

module.exports = pool;
