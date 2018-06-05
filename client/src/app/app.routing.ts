import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import {UserEditComponent} from './components/user-edit.component';
import {ArtistListComponent} from './components/artist-list.component';

const appRoutes : Routes = [
    {
        path:'',
        redirectTo:'/artists/1',
        pathMatch:'full'
    },
    {path:'',component:ArtistListComponent},
    {path:'artists/:page',component:ArtistListComponent},
    {path:'mis-datos',component: UserEditComponent},
    {path:'**',component:ArtistListComponent} // en caso la ruta sea mala    
];

// configuracion necesaria para el router
export const appRoutingProviders: any[]=[];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);