import { Injectable } from "@angular/core"
import { Http } from "@angular/http"

@Injectable()
export class BossService {
    
    private url: string

    constructor(private http: Http){}

    getBoss(id: number): Promise<any> {

        const url: string = `http://localhost:3088/heroclicker/boss/` + id

        return this.http.get(url)
                   .toPromise()
    }
}