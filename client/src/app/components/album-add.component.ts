import {Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Artist} from '../models/artist';
import {GLOBAL} from '../services/global';
import {Album} from '../models/album';

@Component({
    selector: 'album-add',
    templateUrl: '../Views/album-add.html',
    providers: [UserService, ArtistService]
})

export class AlbumAddComponent implements OnInit {
    public titulo: string;
    public artist: Artist;
    public album: Album;
    public identity;
    public token;
    public url: string;
    public alertMessage;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userservice: UserService,
        private _artistService: ArtistService 
    ) {
        this.titulo = 'Crear Album';
        this.identity = this._userservice.getIdentity();
        this.token = this._userservice.getToken();
        this.url = GLOBAL.url;
        this.album = new Album ('', '', 2018, '', '');
    }

    ngOnInit() {
       // console.log('Componente AlbumAddComponent Cargado');
    }

    onSubmit() {
        this._route.params.forEach((params: Params) => {
            let artist_id = params['artist'];
            this.album.artist = artist_id;
            
            console.log(this.album);
        });
    }
}
