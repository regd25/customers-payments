const express = require("express");
const config = require("./config");
const pool = require("./db");
const controller = require("./controller");
const errors = require('./network/errors')

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.get('/user/payments', controller.getUserPayments)

app.use(errors)
app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
    // Se prueba un query antes para ver si funciona el pool
    pool.query('SELECT 1 + 1 AS solution').then(() => {
        console.log('Base de datos inicializada correctamente');
    });
});
