import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {GLOBAL} from './global';

@Injectable()
export class ArtistService {

    public identity;
    public token;
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
       
        addArtist() {
       return('Method not implemented.');
    }
}
