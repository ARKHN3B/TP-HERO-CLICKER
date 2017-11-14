import * as mySQL from 'mysql'
import * as BodyParser from 'body-parser'
import { Request, Response } from 'express'

var npEscape = require('mysql-named-params-escape')

export class ServicesHeroClicker {
    
    protected connection: mySQL.Connection

    constructor(connection: mySQL.Connection){
        this.connection = connection
    }

    getConnection(): mySQL.Connection {
        return this.connection
    }

    getBosses(req: Request, res: Response): Promise<any> {

        const connection: mySQL.Connection = this.getConnection()

        let query: string = `SELECT * FROM boss WHERE id=?`
        let id: number = req.params.id

        return new Promise( (resolve, reject) => {
            connection.query(query, id, (err, result, fields) => {
                console.log(err)
                resolve(result)
            })
        })
    }

    getUser(req: Request, res: Response): Promise<any> {
        
        const connection: mySQL.Connection = this.getConnection()

        let query: string = `SELECT * FROM user WHERE id=?`
        let id: number = req.params.id

        return new Promise((resolve, reject) => {
            connection.query(query, id, (err, result, fields) => {
                resolve(result)
            })
        })
    }

    putGold(req: Request, res: Response): Promise<any> {

        const connection: mySQL.Connection = this.getConnection()

        let querystring: string = `UPDATE user SET gold=:gold WHERE id=:id`
        let object: {} = {
            gold: req.params.gold,
            id: req.params.id
        }

        let query: any = npEscape(querystring, object)

        return new Promise((resolve, reject) => {
            connection.query(query, object, (err, result, fields) => {
                resolve(result)
            })
        })
    }

    putLvl(req: Request, res: Response): Promise<any> {
        
        const connection: mySQL.Connection = this.getConnection()

        let querystring: string = `UPDATE user SET lvl=:lvl, xp=:xp WHERE id=:id`
        let object: {} = {
            lvl: req.params.lvl,
            xp: req.params.xp,
            id: req.params.id
        }

        let query: any = npEscape(querystring, object)

        return new Promise((resolve, reject) => {
            connection.query(query, object, (err, result, fields) => {
                resolve(result)
            })
        })
    }

    putWeaponLvl(req: Request, res: Response): Promise<any> {
        
        const connection: mySQL.Connection = this.getConnection()

        let querystring: string = `UPDATE user SET weaponLvl=:lvl WHERE id=:id`
        let object: {} = {
            lvl: req.params.lvl,
            id: req.params.id
        }

        let query: any = npEscape(querystring, object)

        return new Promise((resolve, reject) => {
            connection.query(query, object, (err, result, fields) => {
                resolve(result)
            })
        })
    }

    getWeaponLvl(req: Request, res: Response): Promise<any> {
        
        const connection: mySQL.Connection = this.getConnection()

        let query: string = `SELECT weaponLvl FROM user WHERE id=?`
        let id: number = req.params.id

        return new Promise( (resolve, reject) => {
            connection.query(query, id, (err, result, fields) => {
                console.log(err)
                resolve(result)
            })
        })
    }
}