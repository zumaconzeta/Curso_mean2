import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {GLOBAL} from './global';
import { map } from 'rxjs/operators';
import { Artist } from '../models/artist';

@Injectable()
export class UploadService {

    public identity;
    public token;
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

       // Peticion ajax para sur archivos
       makeFileRequest(url: string, params: Array<string>, files: Array<File>,token: string, name: string) {

        // promesa, lanza el código de la subida
        return new Promise(function(resolve, reject) {
            const formData: any = new FormData(); // para simular el comportamiento de un formulario normal
            const xhr = new XMLHttpRequest();  // peticion ajax

            for (let i = 0; i < files.length; i++) {
                formData.append(name, files[i], files[i].name);
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    }
}
