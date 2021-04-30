import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title;
  public user: User;
  public status: string;
  public url: string;
  public identity;
  public token;
  public froala_options: Object = {
                        placeholderText: 'Añade una biografía...',
                        charCounterCount: true,
                      };

  public afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg, .png, .jpeg, .gif",
      maxSize: "50",
      uploadAPI:  {
        url: Global.url + "user/upload",
        method:"POST",
        headers: {
          "Authorization" : this._userService.getToken()
        }
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      hideSelectBtn: false,
      fileNameIndex: true,
      attachPinText: 'Sube tu imagen de perfil'
  };

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.page_title = "Ajustes de usuario";
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
    this.user = new User(this.identity.sub, this.identity.name, this.identity.surname, this.identity.role, this.identity.email, '', this.identity.description, this.identity.image);
   
    this.url = Global.url; 
  }



  ngOnInit(): void {

    /*console.log(this.identity);

    if(this.token == null || this.token == 'undefined'){
      this._router.navigate(['/404']);           
    }else {
      document.querySelector("#description").innerHTML = this.identity.description;
    } */
    
  }

  onSubmit(form){
    this._userService.update(this.token, this.user).subscribe(
      response => {
        if(response.status == "SUCCESS"){
          this.status = response.status;
          if(response.changes.name){this.user.name = response.changes.name;}
          if(response.changes.surname){this.user.surname = response.changes.surname;}
          if(response.changes.email){this.user.email = response.changes.email;}
          if(response.changes.description){this.user.description = response.changes.description;}
          if(response.changes.image){this.user.image = response.changes.image;}
                    
          this.identity = this.user;
          this.identity.id = response.sub;          
          
          localStorage.setItem("identity", JSON.stringify(this.identity));
        } else {
          this.status == "ERROR";
        }
      },
      error => {
        console.log(<any>error);
        this.status == "ERROR";
      }
    );
  }



  avatarUpload(file){
    let data = JSON.parse(file.response);
    this.user.image = data.image;
  }

}
