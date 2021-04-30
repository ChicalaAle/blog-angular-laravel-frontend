import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { Global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {

  public froala_options: Object = {
    placeholderText: 'Contenido de la entrada...',
    charCounterCount: true,
  };

  public afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg, .png, .jpeg, .gif",
      maxSize: "50",
      uploadAPI:  {
        url: Global.url + "post/upload",
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
      attachPinText: 'Sube una imagen para tu entrada'
  };

  public page_title: string;
  public post: Post;
  public identity;
  public token;
  public categories;
  public status;


  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _categoryService: CategoryService,
    private _postService: PostService
    ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.page_title = "Crear una nueva entrada";
  }

  ngOnInit(): void {
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    this.getCategories();
    console.log(this.post);
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        console.log(response);
        if(response.status == 'SUCCESS'){
          this.categories = response.categories;
        }
      }, 
      error => {
        console.log(<any>error);
      }
    )
  }

  onSubmit(form){
    this._postService.create(this.token, this.post).subscribe(
      response => {
        console.log(response);
        if(response.status == 'SUCCESS'){
          this.post = response.post;
          this.status = response.status;
          //this._router.navigate(['/inicio']);
        } else {
          this.status = 'ERROR';
        }
      }, error => {
        console.log(<any>error);
        this.status = 'ERROR';
      }
    )

    //this._postService.test(this.post);
  }

  postImage(file){
    let data = JSON.parse(file.response);
    this.post.image = data.image;
  }

  

}
