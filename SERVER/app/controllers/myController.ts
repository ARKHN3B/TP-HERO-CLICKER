import { Router, Request, Response } from "express"
import { connection } from "../server"
import { ServicesHeroClicker } from "../services/ServicesHeroClicker"  

const router: Router = Router()

router
    .get('/', (req: Request, res: Response) => {
        res.send('It works !')
    })
    .get('/boss/:id', (req: Request, res: Response) => {

        let service: ServicesHeroClicker = new ServicesHeroClicker(connection)
        let promise: Promise<any> = service.getBosses(req, res)
                .then((data: any) => {
                    res.json(data)
                })
    })
    .get('/user/:id', (req: Request, res: Response) => {

        let service: ServicesHeroClicker = new ServicesHeroClicker(connection)
        let promise: Promise<any> = service.getUser(req, res)
                .then((data: any) => {
                    res.json(data)
                })
    })
    .put('/user/:id/:gold', (req: Request, res: Response) => {
        let service: ServicesHeroClicker = new ServicesHeroClicker(connection)
        let promise: Promise<any> = service.putGold(req, res)
                .then((data: any) => {
                    res.send('ok')
                })
    })
    .put('/user/:id/lvlxp/:lvl/:xp', (req: Request, res: Response) => {
        let service: ServicesHeroClicker = new ServicesHeroClicker(connection)
        let promise: Promise<any> = service.putLvl(req, res)
                .then((data: any) => {
                    res.send('ok')
                })
    })
    .put('/user/:id/weapon/:lvl', (req: Request, res: Response) => {
        let service: ServicesHeroClicker = new ServicesHeroClicker(connection)
        let promise: Promise<any> = service.putWeaponLvl(req, res)
                .then((data: any) => {
                    res.send('ok')
                })
    })
    .get('/user/:id/weapon', (req: Request, res: Response) => {
        
        let service: ServicesHeroClicker = new ServicesHeroClicker(connection)
        let promise: Promise<any> = service.getWeaponLvl(req, res)
                .then((data: any) => {
                    res.json(data)
                })
    })

export const myCONTROLLER: Router = router