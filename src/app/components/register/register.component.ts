import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})

export class RegisterComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public errors: [];
  public message: string;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { 
    this.page_title = 'Registrarse en el blog';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
  }
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this._router.navigate(['inicio']);
    }
  }

  onSubmit(form){
    
    this._userService.register(this.user).subscribe(
      response => {

        if(response.status == "SUCCESS"){
          this.message = response.message;
        }else {
          this.message = response.errors.email[0];
        }        
        
        this.status = response.status;

        console.log("status:"+this.status);
        
      },
      
      error => {
        this.status = "ERROR";
        console.log(<any>error);
      }
    );
    
   
  }

}
