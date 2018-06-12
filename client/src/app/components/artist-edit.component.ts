import {Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {ArtistService} from '../services/artist.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Artist} from '../models/artist';
import {GLOBAL} from '../services/global';

@Component({
    selector: 'artist-edit',
    templateUrl: '../Views/artist-add.html',
    providers: [UserService, ArtistService]
})

export class ArtistEditComponent implements OnInit {
    public titulo: string;
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public is_edit;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userservice: UserService,
        private _artistService: ArtistService
    ) {
        this.titulo = 'Crear Nuevo Artista';
        this.identity = this._userservice.getIdentity();
        this.token = this._userservice.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('', '', '');
        this.is_edit = true;
    }

    ngOnInit() {
        // console.log ('artist-edit.component.ts cargado');
       // llamar al metodo del api para sacar un asrtista en base a si id getartist
       this.getArtist();
    }

    getArtist() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._artistService.getArtist(this.token, id).subscribe(
                response => {
                    if (!response.artist) {
                        this._router.navigate(['/']);
                    } else {
                         this.artist = response.artist;
                    }
                },
                error => {
                    const errorMessage = <any> error;
                    if (errorMessage != null) {
                      const body = JSON.parse(error._body);
                      // this.alertMessage = body.message;
                      console.log(error);
                    }
                  }
            );
        });
    }

    onSubmit() {
        // console.log (this.artist);
        this._route.params.forEach((params: Params) => {
            let id = params['id'];
            this._artistService.editArtist(this.token, id, this.artist).subscribe(
                response => {
                    // respuesta de la BD
                    if (!response.artist) {
                        this.alertMessage = 'Error en el servidor';
                    } else {
                        this.alertMessage = 'El artista se Actualizado Correctamente';
                        // this.artist = response.artist;
                    //  this._router.navigate(['/editar-artista'], response.artist._id);
                    }
                },
                error => {
                    const errorMessage = <any> error;
                    if (errorMessage != null) {
                    const body = JSON.parse(error._body);
                    this.alertMessage = body.message;
                    console.log(error);
                    }
                }
            );
        });
    }
}
