import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import {PostService} from '../../services/post.service';
import {UserService} from '../../services/user.service';
import {Global} from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService, UserService]
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public url;
  public posts: Array<Post>;
  public token: string;
  public identity;



  constructor(
    private _postService: PostService,
    private _userService: UserService
  ) {
    this.page_title = "Estos son los nuevos posts subidos por los usuarios.";
    this.url = Global.url;
    this.token = this._userService.getToken();
    this.identity = this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this._postService.getPosts().subscribe(
      response =>{
        if(response.status == "SUCCESS"){
          this.posts = response.posts;

          let cont = this.posts[0].content;
          console.log(cont);

        }
      }, error => {
        console.log(<any>error);
      }
    )
  }


}
