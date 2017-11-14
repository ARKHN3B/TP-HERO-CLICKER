import { Component, Input, Output, EventEmitter } from '@angular/core'
import { MatSnackBarModule, MatSnackBar } from '@angular/material'
import { Boss } from '../class/Boss'
import { OnInit } from '@angular/core'
import { dispatchEvent } from '@angular/core/src/view/util'
import { BossService } from '../services/boss.service'
import { UserService } from '../services/user.service'
import { Store } from '../store'
import 'rxjs/Rx'


@Component({
    selector: 'app-gameview',
    templateUrl: '../views/gameview.component.html',
    styleUrls: ['../styles/gameview.component.scss'],
    providers: [BossService, UserService, Store]
})
export class GameviewComponent implements OnInit {

    public boss: Boss
    protected oldRandom: number
    public damage: number
    public widthLife: string 
    public fullLife: number
    public points: number
    public pointsDisplay: number
    public oldRandomGold: number = 0
    public oldXP: number = 0
    public displayStore: boolean = false
    // public test: number

    constructor(private BossService: BossService, private userService: UserService, private store: Store, public snackBar: MatSnackBar){
        this.store
          .changes // # 10) On souscrit ici aux changements
    }

    ngOnInit(): void {
        
        this.oldRandom = Math.round(Math.random() * (6 - 1) + 1)
        this.displayBoss(this.oldRandom)
    }

    Attack(): void {

        this.damage = Math.round(Math.random() * (10 - 5) + 5)
        this.damage += this.setWeaponForce()      

        let boss: Boss = this.boss

        this.points -= (this.damage * 100) / this.fullLife
        this.pointsDisplay = Math.round(this.points)
        this.widthLife = this.points + '%'
        
        boss.lifepoints -= this.damage
        
        if (boss.lifepoints <= 0) {
            let random: number = Math.round(Math.random() * (6 - 1) + 1)

            while (random == this.oldRandom) {
                random = Math.round(Math.random() * (6 - 1) + 1)
            }

            let randomGold: number = Math.round(Math.random() * (50 - 3) + 3)
            let randomXP: number = Math.random() * (0.5 - 0.002) + 0.002

            // ### TODO 1 : GET A RANDOM BY NUMBER OF XP(ROUND)
            var randomize: number = Math.round(Math.random() * (1000 - 650) + 650)
            let xp: number = (this.oldXP / randomize) + randomXP

            var oldGold: number = 0

            if (this.oldRandomGold == 0) {
                
                oldGold = 0   
            }
            else if (this.oldRandomGold % 2 == 0) {

                const array: Array<number> = [2, 4, 6, 8]
                const arrayLength: number = array.length
                let random: number = Math.round(Math.random() * (arrayLength - 1) + 1)
                oldGold = array[random - 1]
            } else {

                const array: Array<number> = [1, 3, 5, 7, 9]
                const arrayLength: number = array.length
                let random: number = Math.round(Math.random() * (arrayLength - 1) + 1)
                oldGold = array[random - 1];
            }

            oldGold = randomGold / oldGold

            let gold: number = oldGold + randomGold
            gold = Math.round(gold)
            
            this.setGoldXP(gold, xp)

            const showXP = Math.round(xp * 1000) / 100

            this.openSnackBar(`Gold:  ${gold}`, `Exp:  ${showXP}`)

            this.oldRandom = random
            this.oldRandomGold = randomGold
            this.oldXP = xp
            this.displayBoss(random)
        }
    }

    displayBoss(id: number): void {
        this.BossService.getBoss(id)
                    .then( (data: any) => {
                        data = data.json()[0];

                        let random: number = Math.ceil(Math.random() * (199 - 49) + 49)
                        let bossLife = this.setBossLife(random)

                        this.boss = new Boss(data.id, data.name, bossLife, data.path_img)
                        this.fullLife = this.boss.lifepoints
                        this.points = 100
                        this.pointsDisplay = 100

                        const currentStore = this.store.getState()
                        this.oldRandomGold = currentStore.gold
                        this.oldXP = currentStore.xp

                        this.widthLife = this.points + '%';
                        
                    })
    }

    putDatabase(id: number, gold: number, lvl: number, xp: number): void {
        this.userService.putGold(id, gold)
        this.userService.putLvl(id, lvl, xp)
    }

    setGoldXP(goldNumber: number, exp: number): void {
        const currentStore = this.store.getState()
        const gold: number = currentStore.gold + goldNumber 
        const userID: number = currentStore.userID
        const xp: number = currentStore.xp + exp

        let lvl: number
        xp >= (currentStore.lvl + 1) ? lvl = Math.round(xp) : lvl = currentStore.lvl

        this.putDatabase(userID, gold, lvl, xp)
        this.store.setState(Object.assign( {}, currentStore, {xp, lvl, gold} ))
    }

    setBossLife(number: number): number {
        const currentStore = this.store.getState()
        const bossLife: number = currentStore.bossLife + number
        this.store.setState(Object.assign( {}, currentStore, {bossLife} ))
        return bossLife
    }

    setRandom(myInt: number){
        //### todo 1 here
    }   

    setWeaponForce(): number {
        const currentStore = this.store.getState()
        let lvl: number = currentStore.weaponLvl
        let result: number = 5 * lvl
        return result
    }

    cheatcode(value: string, number?: number) {

        var currentStore = this.store.getState()
        var userID: number = currentStore.userID
        var currentGold: number = currentStore.gold

        number == 0 ? number = currentGold + 500 : number += currentGold

        if (value == 'needGold') {
            this.userService.putGold(userID, number)
            this.store.setState(Object.assign( {}, currentStore, {gold: number} ))
        }
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    displayedStore(){
        this.displayStore = !this.displayStore
    }

    // giveWeaponLvl(){
    //     const currentStore = this.store.getState()
    //     const currentLvl = this.userService.getUser(currentStore.userID).then((data: any) => {
    //                                                                             data = data.json()
    //                                                                             this.test = data[0]
    //                                                                     })
        
    // }
}