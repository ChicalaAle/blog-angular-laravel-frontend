import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public user: User;
  public status: string;
  public message: string;
  public token: string;
  public identity;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }

  ngOnInit(): void {
    if(localStorage.getItem('token') != undefined){      
      this._router.navigate(['inicio']);
    }
    this.logout();
  }

  onSubmit(form): void {
    this._userService.signup(this.user).subscribe(
      response => {
        
        if(response.status != 'ERROR'){

          this.status = 'SUCCESS';
          this.token = response;

          this._userService.signup(this.user, true).subscribe(
            response => {
                    
                this.identity = response;

                this.message = this.identity.name;

                localStorage.setItem('token', this.token);
                localStorage.setItem('identity', JSON.stringify(this.identity));

                setTimeout(() =>{
                  this._router.navigate(['inicio']);
                }, 500);
      
            }, error => {
              console.log(<any>error);
              this.status = 'ERROR';
            }
          );
          
        

        } else {
          this.status = 'ERROR';
          this.message = response.message;
        }

      }, error => {
        console.log(<any>error);
        this.status = 'ERROR';
      }
    );
  }

  logout() {
    this._route.params.subscribe(params => {
      let logout = params['sure'];

      if(logout == 'true'){

        
        localStorage.removeItem('token');
        localStorage.removeItem('identity');

        this.identity = null;
        this.token = null;

        // Redirección a inicio
        //this._router.navigate(['login']);
      }
    });
  }
}
