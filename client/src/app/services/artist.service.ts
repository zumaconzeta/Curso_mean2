import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {GLOBAL} from './global';
import { map } from 'rxjs/operators';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService {

    public identity;
    public token;
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    addArtist(token, artist: Artist) {
        let params = JSON.stringify(artist);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.post(this.url + 'artist', params, {headers: headers})
        .pipe(map(res => res.json()));
    }

}
