import {Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Artist} from '../models/artist';
import {GLOBAL} from '../services/global';

@Component({
    selector: 'artist-list',
    templateUrl: '../Views/artist-list.html',
    providers: [UserService]
})

export class ArtistListComponent implements OnInit {
    public titulo: string;
    public artists: Artist[];
    public identity;
    public token;
    public url: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userservice: UserService
    ) {
        this.titulo = 'Artistas';
        this.identity = this._userservice.getIdentity();
        this.token = this._userservice.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit() {
        console.log ('artist-list.component.ts cargado');

        // Conseguir el listado de los artistas
    }
}
