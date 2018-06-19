import {Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';

import {ArtistService} from '../services/artist.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Artist} from '../models/artist';
import {GLOBAL} from '../services/global';

@Component({
    selector: 'artist-detail',
    templateUrl: '../Views/artist-detail.html',
    providers: [UserService, ArtistService]
})

export class ArtistdetailComponent implements OnInit {
    public titulo: string;
    public artist: Artist;
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
        this.identity = this._userservice.getIdentity();
        this.token = this._userservice.getToken();
        this.url = GLOBAL.url;
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

}
