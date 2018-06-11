import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home.component';
import {UserEditComponent} from './components/user-edit.component';
import {ArtistListComponent} from './components/artist-list.component';
import {ArtistAddComponent} from './components/artist-add.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'artistas/:page' , component: ArtistListComponent},
     {path: 'crear-artista' , component: ArtistAddComponent},
    {path: 'mis-datos', component: UserEditComponent},
    {path: '**', component: HomeComponent} // en caso la ruta sea mala
];

// configuracion necesaria para el router
export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
