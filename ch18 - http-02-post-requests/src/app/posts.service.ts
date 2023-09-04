import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createPost(post: Post){
    this.http
      .post<{ name: string }>(
        'https://recipes-dd967-default-rtdb.firebaseio.com/posts.json',
        post,
        {
          observe: 'response'
        }
      )
      .subscribe(responseData => {
        console.log(responseData.body);
      },
      error => {
        this.error.next(error.message);
      });
  }

  getPosts(){
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http.get<{ [key: string]: Post }>(
      'https://recipes-dd967-default-rtdb.firebaseio.com/posts.json',
      {
        headers: new HttpHeaders({ 'custom-header': 'Hello' }),
        params: searchParams,
        responseType: 'json'
      }
    )
      .pipe(map(response => {
        const postArray = [];
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            postArray.push({ ...response[key], id: key })
          }
        }
        return postArray;
      })
    );
  }

  deleteAllPosts(){
    return this.http.delete(
      'https://recipes-dd967-default-rtdb.firebaseio.com/posts.json',
      {
        observe: 'events',
        responseType: 'json'
      }
    ).pipe(
      tap(
        event => {
          if (event.type === HttpEventType.Sent){
            console.log(event.type);
          }

          if (event.type === HttpEventType.Response){
            console.log(event.body);
          }
        }
      )
    );
  }
}
