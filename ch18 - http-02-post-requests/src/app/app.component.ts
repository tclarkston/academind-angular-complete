import { PostsService } from './posts.service';
import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.createPost(postData);
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.postService.deleteAllPosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.loadedPosts = posts;
      this.isFetching = false;
    }, (error) => {
      this.error = error.message;
    });
  }
}
