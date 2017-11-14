import { Component, Input, OnInit } from '@angular/core'
import { User } from '../class/User'
import { UserService } from '../services/user.service'
import { Store } from '../store'
import 'rxjs/Rx'


@Component({
    selector: 'app-player-header',
    templateUrl: '../views/playerhead.component.html',
    styleUrls: ['../styles/playerhead.component.scss'],
    providers: [ UserService, Store ]
})
export class PlayerheadComponent implements OnInit {

    public user: User
    public lvl: number
    public xp: number
    public gold: number

    constructor(private userService: UserService, private store: Store){
        this.store
                     .changes
                     .pluck('gold')
                     .subscribe( (gold: number) => this.gold = gold)
        this.store
                     .changes
                     .pluck('xp')
                     .subscribe( (xp: number) => this.xp = xp)
        this.store
                     .changes
                     .pluck('lvl')
                     .subscribe( (lvl: number) => this.lvl = lvl)
    }

    ngOnInit(): void {
        this.displayUser(1)
    }

    displayUser(id: number): void {
        this.userService.getUser(id)
                    .then((data: any) => {
                        data = data.json()[0]
                        this.user = new User(data.id, data.username, data.xp, data.lvl, data.gold, data.weaponLvl)

                        const gold: number = data.gold
                        const userID: number = data.id
                        const username: string = data.username
                        const xp: number = data.xp
                        const lvl: number = data.lvl
                        const currentState = this.store.getState()
                        const weaponLvl:number = data.weaponLvl 
                        this.store.setState(Object.assign( {}, currentState, {userID, username, xp, lvl, gold, weaponLvl} ))
                    })
    }
}