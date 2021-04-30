import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { CategoryService } from './services/category.service';
import { Global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService, CategoryService]
})
export class AppComponent implements OnInit, DoCheck {
  public title = 'blog-angular';
  public url: string;
  public date: Date;
  public identity;
  public token;
  public categories;

  constructor(
    private _userService: UserService,
    private _categoryService: CategoryService
  ){
    this.loadUser();
    this.url = Global.url;
  }

  ngOnInit() {    
    this.getCategories();
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getDate(){
    let date = new Date();
    return date.getFullYear();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        this.categories = response.categories;
      },
      error => {
        console.log(<any>error);
      }
    )
  }

}
