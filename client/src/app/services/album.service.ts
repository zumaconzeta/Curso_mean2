import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {GLOBAL} from './global';
import { map } from 'rxjs/operators';
import { Album } from '../models/album';

@Injectable()
export class AlbumService {

    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    addAlbum (token, album: Album) {
        console.log('Hola Programador ' + this.url + 'album');
        let params = JSON.stringify(album);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.post(this.url + 'album', params, {headers: headers})
        .pipe(map(res => res.json()));
    }

}
