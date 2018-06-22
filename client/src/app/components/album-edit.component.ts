import {Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {AlbumService} from '../services/album.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../services/global';
import {Album} from '../models/album';

@Component({
    selector: 'album-edit',
    templateUrl: '../Views/album-add.html',
    providers: [UserService, AlbumService]
})

export class AlbumEditComponent implements OnInit {
    public titulo: string;
    public album: Album;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public is_edit;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userservice: UserService,
        private _albumservice: AlbumService
    ) {
        this.titulo = 'Editar Album';
        this.identity = this._userservice.getIdentity();
        this.token = this._userservice.getToken();
        this.url = GLOBAL.url;
        this.album = new Album ('', '', 2018, '', '');
        this.is_edit = true;
    }

    ngOnInit() {
       // console.log('Componente AlbumAddComponent Cargado');
    }

    onSubmit() {
        this._route.params.forEach((params: Params) => {
            let artist_id = params['artist'];
            this.album.artist = artist_id;
            this._albumservice.addAlbum(this.token, this.album).subscribe(
                response => {
                    // respuesta de la BD
                    if (!response.album) {
                        this.alertMessage = 'Error en el servidor';
                    } else {
                        this.alertMessage = 'El Album se creado Correctamente';
                        this.album = response.album;
                        // this._router.navigate(['/editar-artista', response.artist._id]);
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
