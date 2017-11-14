import { Injectable } from "@angular/core"
import { Http } from "@angular/http"
import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http/src/static_response";

@Injectable()
export class UserService {

    private url: string

    constructor(private http: Http){}

    getUser(id: number): Promise<any> {

        const url: string = `http://localhost:3088/heroclicker/user/${id}`

        return this.http.get(url)
                   .toPromise()
    }

    putGold(id: number, gold: number): Promise<any> {

        const url: string = `http://localhost:3088/heroclicker/user/${id}/${gold}`
        const body: any = {};

        return this.http.put(url, JSON.stringify(body)).toPromise();
    }

    putLvl(id: number, lvl: number, xp: number): Promise<any> {
        
        const url: string = `http://localhost:3088/heroclicker/user/${id}/lvlxp/${lvl}/${xp}`
        const body: any = {};

        return this.http.put(url, JSON.stringify(body)).toPromise();
    }

    putWeaponLvl(id: number, lvl: number): Promise<any> {
        
        const url: string = `http://localhost:3088/heroclicker/user/${id}/weapon/${lvl}`
        const body: any = {};

        return this.http.put(url, JSON.stringify(body)).toPromise();
    }

    getWeaponLvl(id: number): Promise<any> {
        
        const url: string = `http://localhost:3088/heroclicker/user/${id}/weapon`

        return this.http.get(url)
                    .toPromise()
    }
}