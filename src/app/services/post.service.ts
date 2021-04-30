import {Injectable, SkipSelf} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from '../models/post';
import {Global} from './global';

@Injectable()
export class PostService {

    public url: string;
    public identity;
    public token;

    constructor(public _http: HttpClient){
        this.url = Global.url;
    }

    test(post){

        let x = post;
        let con = post.content;
        let arr = con.replaceAll('&nbsp;', '');
        post.content = arr;

        console.log(post);

        /*let json = JSON.stringify(post);
        let otrojson = post.content;
        let arreglo = otrojson.replace('&nbsp;', '');
        console.log(arreglo);*/
        return "hola";
    }

    create(token, post): Observable<any>{

        this.fixSpaces(post);

        let json = JSON.stringify(post);
        let params = "json="+json;
        
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
        
        return this._http.post(this.url + "posts", params, {headers: headers});
    }

    getPosts(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + "posts", {headers: headers});
    }

    getPost(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get(this.url + "posts/" + id, {headers: headers});
    }

    update(token, post, id): Observable<any>{

        this.fixSpaces(post);

        let json = JSON.stringify(post);
        let params = "json="+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

        return this._http.put(this.url + "posts/"+ id, params, {headers: headers});
    }




    //FUNCIONES AUXILIARES
    fixSpaces(post){
        let content = post.content;
        let arr = content.replaceAll('&nbsp;', '');
        post.content = arr;
    }
}