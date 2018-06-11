import {Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Artist} from '../models/artist';
import {GLOBAL} from '../services/global';

@Component({
    selector: 'artist-add',
    templateUrl: '../Views/artist-add.html',
    providers: [UserService]
})

export class ArtistAddComponent implements OnInit {
    public titulo: string;
    public artist: Artist;
    public identity;
    public token;
    public url: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userservice: UserService
    ) {
        this.titulo = 'Crear Nuevo Artista';
        this.identity = this._userservice.getIdentity();
        this.token = this._userservice.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('', '', '');
    }

    ngOnInit() {
        console.log ('artist-add.component.ts cargado');
    }
    onSubmit() {
        console.log (this.artist);
    }
}
