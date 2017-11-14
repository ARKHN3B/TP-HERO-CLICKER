import * as mySQL from 'mysql'
import * as express from 'express'
import * as BodyParser from 'body-parser'

import { myCONTROLLER } from "./controllers/myController";

const app: express.Application = express()
const port: string | number = process.env.port || 3088

export const connection: mySQL.Connection = mySQL.createConnection({

    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'TP_HERO_CLICKER'
})

app.use(BodyParser.urlencoded({extended: false}))
   .use(BodyParser.json())
   .use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
   })
   .use('/heroclicker', myCONTROLLER)
   .listen(port, () => {
        console.log(`Listening at the port ${port}`)
   })