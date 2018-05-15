import { Component,OnInit } from '@angular/core';
import {UserService} from './services/user.service';
import {User} from './models/user'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})

export class AppComponent {
 public  title = 'MUSIFY';
 public user: User;
 public identity;
 public token;
 public errorMessage;

 constructor(
   private _userService:UserService
 ){
  this.user = new User('','','','','','ROLE_USER','');
 }

ngOnInit(){
 //var texto = this._userService.signup();
 //console.log(texto);
}

public onSubmit(){
  console.log(this.user);


  // consegui rlos datosa del usuairo
  this._userService.signup(this.user).subscribe(
    response => {
      let identity = response.user;
      this.identity = identity;

      if(!this.identity._id){
        alert("El usuario no está correctamente Identificado");
      }else{
        // crear elemento en el localstorage para tener el usuario sesión

        // conseguir el Token para enviarselo a cada petición http
        this._userService.signup(this.user,'true').subscribe(
          response => {
            let token = response.token;
            this.token = token;
      
            if(this.token.length <= 0 ){
              alert("El token no se ha generado");
            }else{
              // crear elemento en el localstorage para tener Token disponible      
              console.log(this.token);
              console.log(identity);              
            }
          },
          error => {
            var errorMessage = <any> error;
            if(errorMessage != null){
              var body = JSON.parse(error._body);
              this.errorMessage = body.message;
              console.log(error);
            }
          }
          
        );
      }
    },
    error => {
      var errorMessage = <any> error;
      if(errorMessage != null){
        var body = JSON.parse(error._body);
        this.errorMessage = body.message;
        console.log(error);
      }
    }
    
  );
}

}
