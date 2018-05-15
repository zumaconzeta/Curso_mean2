import {Injectable} from '@angular/core';
import {Http,Response, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
//import { of } from 'rxjs';

//import { Observable } from 'rxjs';
import { isPending } from 'q';
import {GLOBAL} from './global';

@Injectable()

export class UserService{
    public url: string;

    constructor(private _http: Http){
        this.url = GLOBAL.url;        
    }
    

    signup(user_to_login,gethash = null ){
        //return 'hola Mundo desde el servicio';
        if (gethash != null){
            user_to_login.gethash = gethash;
        }

        let json = JSON.stringify(user_to_login)
        let params = json;

        let headers = new Headers({'Content-Type': 'application/json'});

        return this._http.post(this.url + 'login',params,{headers:headers})
                            .pipe(map(res =>res.json())); 
    }
}