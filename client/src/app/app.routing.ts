import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

import {UserEditComponent} from './components/user-edit.component';

const appRoutes : Routes = [
    {path:'',component:UserEditComponent},
    {path:'mis-datos',component: UserEditComponent},
    {path:'**',component:UserEditComponent} // en caso la ruta sea mala    
];

// configuracion necesaria para el router
export const appRoutingProviders: any[]=[];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);