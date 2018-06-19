import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './components/home.component';
import {UserEditComponent} from './components/user-edit.component';
import {ArtistListComponent} from './components/artist-list.component';
import {ArtistAddComponent} from './components/artist-add.component';
import {ArtistEditComponent} from './components/artist-edit.component';
import {ArtistdetailComponent} from './components/artist-detail.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'artistas/:page' , component: ArtistListComponent},
    {path: 'crear-artista' , component: ArtistAddComponent},
    {path: 'editar-artista/:id' , component: ArtistEditComponent},
    {path: 'artista/:id' , component: ArtistdetailComponent},
    {path: 'mis-datos', component: UserEditComponent},
    {path: '**', component: HomeComponent} // en caso la ruta sea mala
];

// configuracion necesaria para el router
export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
