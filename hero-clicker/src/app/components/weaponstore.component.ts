import { Component, Input } from "@angular/core"
import { Store } from "../store";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { Weapons } from "../class/Weapons";
import { UserService } from "../services/user.service";

@Component({
    selector: 'app-weaponstore',
    templateUrl: '../views/weaponstore.component.html',
    styleUrls: ['../styles/weaponstore.component.scss'],
    providers: [UserService]
})
export class WeaponstoreComponent implements OnInit{

    ngOnInit(): void {
        this.setWeapon(this.test)
    }

    @Input()
    public displayStore: boolean


    @Input()
    public test: number

    public display: boolean 
    public lvl: number
    public weapon: Weapons
    public weaponLvl: number

    constructor(private store: Store, private userService: UserService){
        this.store
                .changes
                .pluck('lvl')
                .subscribe( (lvl: number) => this.lvl = lvl)
        this.store
                .changes
                .pluck('weaponLvl')
                .subscribe( (weaponLvl: number) => this.weaponLvl = weaponLvl)
    }

    displayer(): boolean {

        if (this.lvl >= 5) {
            return this.display = true
        }

        const currentStore = this.store.getState()
        const lvl: number = currentStore.lvl

        if (lvl >= 5) {
            return this.display = true
        } else if (lvl == null) {
            return 
        }
    }

    setWeapon(test: number){
        const currentStore = this.store.getState()
        if (test == 0){
            this.weaponLvl = currentStore.weaponLvl
        } else {
            this.weaponLvl = test
        }
        if (this.weaponLvl > 1) {
            var force = this.setWeaponForce(this.weaponLvl)
            var price = this.setWeaponPrice(this.weaponLvl)
            var lvl = this.weaponLvl
        } else {
            var lvl = 1
            var force = 5
            var price = 500
        }
        
        this.weapon = new Weapons(1, "Doomhammer", force, lvl, price)
    }

    setWeaponForce(lvl: number, forceBase:number = 5): number {
        let result: number = forceBase * lvl
        return result
    }

    setWeaponPrice(lvl: number, priceBase:number = 500): number {
        let result: number = priceBase * lvl
        return result
    }

    upWeapon(){
        const currentStore = this.store.getState()
        const currentGold:number = currentStore.gold

        if (this.weapon.price < currentGold) {

            currentStore.gold -= this.weapon.price 
            let weaponLvl: number = currentStore.weaponLvl + 1
            this.store.setState(Object.assign( {}, currentStore, {weaponLvl} ))
            this.userService.putWeaponLvl(currentStore.userID, weaponLvl)

            const setForce: number = this.setWeaponForce(this.weaponLvl)
            const setPrice: number = this.setWeaponPrice(this.weaponLvl)
            this.weapon.lvl = weaponLvl
            this.weapon.price = setPrice
            this.weapon.attack = setForce
        } else {
            console.log('nop')
        }
    }
}