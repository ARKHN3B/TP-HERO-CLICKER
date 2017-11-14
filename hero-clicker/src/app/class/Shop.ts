export class Shop {

    public id: number
    public name: string
    public increase_attack: number

    constructor(id: number, name: string, increase_attack: number){

        this.id = id
        this.name = name
        this.increase_attack = increase_attack
    }
}