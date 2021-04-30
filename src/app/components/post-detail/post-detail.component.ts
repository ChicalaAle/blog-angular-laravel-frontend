import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {

  public post: Post;
  public name:string;
  public surname: string;
  public category:string;
  public updatedAt:string;

  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router
  ){
    this.post = new Post(1, 1, 1, '', '', null, null);
  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(){
    //SACAR EL ID DEL POST DE LA URL
    this._route.params.subscribe(params =>{
      let id = +params['id'];
      
      this._postService.getPost(id).subscribe(response => {
        if(response.status == "SUCCESS"){
          this.post = response.post;
          this.name = response.postDetail.user.name;
          this.surname = response.postDetail.user.surname;
          this.category = response.postDetail.category.name;
          this.updatedAt = response.post.updated_at;
        } else {
          this._router.navigate(['/404']);
        }
      }, error => {console.log(<any>error); 
        this._router.navigate(['/404']);});

    });
  }

}
