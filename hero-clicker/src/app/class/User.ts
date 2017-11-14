export class User {

    private id: number
    private username: string
    private xp: number
    private lvl: number
    private gold: number
    private weaponLvl: number


    constructor(id: number, username: string, xp:number, lvl: number, gold: number, weaponLvl: number){
        
        this.id = id
        this.username = username
        this.xp = xp
        this.lvl = lvl
        this.gold = gold
        this.weaponLvl = weaponLvl
    }

    getId(){
        return this.id
    }

    getUsername(){
        return this.username
    }

    getXP(){
        return this.xp
    }

    getLvl(){
        return this.lvl
    }

    getGold(){
        return this.gold
    }

    getWeaponLvl(){
        return this.weaponLvl
    }
}