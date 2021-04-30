import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [CategoryService, UserService]
})
export class CategoryNewComponent implements OnInit {

  public category: Category;
  public token;
  public status: string;
  public newCategoryName;

  constructor(
    public _CategoryService: CategoryService,
    public _UserService: UserService
  ) {
    this.category = new Category(1, '');
    this.token = this._UserService.getToken();
  }

  ngOnInit(): void {
  }
  
  onSubmit(form){
    this._CategoryService.create(this.token, this.category).subscribe(
      response => {

        this.status = response.status;
        this.newCategoryName = response.category.name;        

      }, 
      error => {
        console.log(<any>error);
        this.status = "ERROR";
      }
    )
  }

}
