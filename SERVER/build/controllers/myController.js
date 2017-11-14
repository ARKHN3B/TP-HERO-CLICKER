"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const server_1 = require("../server");
const ServicesHeroClicker_1 = require("../services/ServicesHeroClicker");
const router = express_1.Router();
router
    .get('/', (req, res) => {
    res.send('It works !');
})
    .get('/boss/:id', (req, res) => {
    let service = new ServicesHeroClicker_1.ServicesHeroClicker(server_1.connection);
    let promise = service.getBosses(req, res)
        .then((data) => {
        res.json(data);
    });
})
    .get('/user/:id', (req, res) => {
    let service = new ServicesHeroClicker_1.ServicesHeroClicker(server_1.connection);
    let promise = service.getUser(req, res)
        .then((data) => {
        res.json(data);
    });
})
    .put('/user/:id/:gold', (req, res) => {
    let service = new ServicesHeroClicker_1.ServicesHeroClicker(server_1.connection);
    let promise = service.putGold(req, res)
        .then((data) => {
        res.send('ok');
    });
})
    .put('/user/:id/lvlxp/:lvl/:xp', (req, res) => {
    let service = new ServicesHeroClicker_1.ServicesHeroClicker(server_1.connection);
    let promise = service.putLvl(req, res)
        .then((data) => {
        res.send('ok');
    });
})
    .put('/user/:id/weapon/:lvl', (req, res) => {
    let service = new ServicesHeroClicker_1.ServicesHeroClicker(server_1.connection);
    let promise = service.putWeaponLvl(req, res)
        .then((data) => {
        res.send('ok');
    });
})
    .get('/user/:id/weapon', (req, res) => {
    let service = new ServicesHeroClicker_1.ServicesHeroClicker(server_1.connection);
    let promise = service.getWeaponLvl(req, res)
        .then((data) => {
        res.json(data);
    });
});
exports.myCONTROLLER = router;
//# sourceMappingURL=myController.js.map