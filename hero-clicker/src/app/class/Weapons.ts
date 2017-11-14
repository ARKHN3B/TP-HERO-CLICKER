export class Weapons {

    public id: number
    public name: string
    public attack: number
    public lvl: number
    public price: number

    constructor(id: number, name: string, attack: number, lvl: number, price: number){
        this.id = id
        this.name = name
        this.attack = attack
        this.lvl = lvl
        this.price = price

        this.increaseAttack()
        this.setPrice()
    
    }

    increaseAttack(): Weapons {

        if (this.lvl == 1) return this

        for (let i = 1; this.lvl > i; i++){
            this.attack *= 1.2
        }

        return this
    }

    setPrice(): Weapons {

        this.lvl != 1 ? this.price * 2 : this.price

        return this
    }
}