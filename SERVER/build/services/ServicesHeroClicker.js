"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var npEscape = require('mysql-named-params-escape');
class ServicesHeroClicker {
    constructor(connection) {
        this.connection = connection;
    }
    getConnection() {
        return this.connection;
    }
    getBosses(req, res) {
        const connection = this.getConnection();
        let query = `SELECT * FROM boss WHERE id=?`;
        let id = req.params.id;
        return new Promise((resolve, reject) => {
            connection.query(query, id, (err, result, fields) => {
                console.log(err);
                resolve(result);
            });
        });
    }
    getUser(req, res) {
        const connection = this.getConnection();
        let query = `SELECT * FROM user WHERE id=?`;
        let id = req.params.id;
        return new Promise((resolve, reject) => {
            connection.query(query, id, (err, result, fields) => {
                resolve(result);
            });
        });
    }
    putGold(req, res) {
        const connection = this.getConnection();
        let querystring = `UPDATE user SET gold=:gold WHERE id=:id`;
        let object = {
            gold: req.params.gold,
            id: req.params.id
        };
        let query = npEscape(querystring, object);
        return new Promise((resolve, reject) => {
            connection.query(query, object, (err, result, fields) => {
                resolve(result);
            });
        });
    }
    putLvl(req, res) {
        const connection = this.getConnection();
        let querystring = `UPDATE user SET lvl=:lvl, xp=:xp WHERE id=:id`;
        let object = {
            lvl: req.params.lvl,
            xp: req.params.xp,
            id: req.params.id
        };
        let query = npEscape(querystring, object);
        return new Promise((resolve, reject) => {
            connection.query(query, object, (err, result, fields) => {
                resolve(result);
            });
        });
    }
    putWeaponLvl(req, res) {
        const connection = this.getConnection();
        let querystring = `UPDATE user SET weaponLvl=:lvl WHERE id=:id`;
        let object = {
            lvl: req.params.lvl,
            id: req.params.id
        };
        let query = npEscape(querystring, object);
        return new Promise((resolve, reject) => {
            connection.query(query, object, (err, result, fields) => {
                resolve(result);
            });
        });
    }
    getWeaponLvl(req, res) {
        const connection = this.getConnection();
        let query = `SELECT weaponLvl FROM user WHERE id=?`;
        let id = req.params.id;
        return new Promise((resolve, reject) => {
            connection.query(query, id, (err, result, fields) => {
                console.log(err);
                resolve(result);
            });
        });
    }
}
exports.ServicesHeroClicker = ServicesHeroClicker;
//# sourceMappingURL=ServicesHeroClicker.js.map