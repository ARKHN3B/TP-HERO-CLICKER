"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mySQL = require("mysql");
const express = require("express");
const BodyParser = require("body-parser");
const myController_1 = require("./controllers/myController");
const app = express();
const port = process.env.port || 3088;
exports.connection = mySQL.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'TP_HERO_CLICKER'
});
app.use(BodyParser.urlencoded({ extended: false }))
    .use(BodyParser.json())
    .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
    .use('/heroclicker', myController_1.myCONTROLLER)
    .listen(port, () => {
    console.log(`Listening at the port ${port}`);
});
//# sourceMappingURL=server.js.map