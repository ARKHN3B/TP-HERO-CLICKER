export class Boss {

    public id: number
    public name: string
    public lifepoints: number
    public path_img: string

    constructor(id: number, name: string, lifepoints: number, path_img: string){

        this.id = id
        this.name = name
        this.lifepoints = lifepoints
        this.path_img = path_img
    }
}