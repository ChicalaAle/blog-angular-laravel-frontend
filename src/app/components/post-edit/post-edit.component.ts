import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { Global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {

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
    this.page_title = "Editar una entrada";
  }

  ngOnInit(): void {
    this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    this.getCategories();
    this.getPost();
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        if(response.status == 'SUCCESS'){
          this.categories = response.categories;
        }
      }, 
      error => {
        console.log(<any>error);
      }
    )
  }

  getPost(){
    //SACAR EL ID DEL POST DE LA URL
    this._route.params.subscribe(params =>{
      let id = +params['id'];
      
      this._postService.getPost(id).subscribe(response => {
        if(response.status == "SUCCESS"){
          this.post = response.post;
          if(this.post.user_id != this.identity.sub){
            this._router.navigate(['/error']);
          }
        } else {
          this._router.navigate(['/error']);
        }
      }, error => {console.log(<any>error); 
        this._router.navigate(['/error']);});

    });
  }

  onSubmit(form){
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      response => {
        console.log(response);
        if(response.status == 'SUCCESS'){
          this.post = response.post_updated;
          this.status = response.status;
          this._router.navigate(['/entrada', response.post_updated.id]);
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
