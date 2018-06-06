import {Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';




@Component({
    selector: 'home',
    templateUrl: '../Views/home.html'
})

export class HomeComponent implements OnInit {
    public titulo: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.titulo = 'Home';
    }

    ngOnInit() {
        console.log ('HOme.component.ts cargado');

        // Conseguir el listado de los artistas
    }
}
