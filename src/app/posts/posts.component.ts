import { Component, OnInit } from '@angular/core';
import { PostService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: any[];
  post;
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts()
      .subscribe( (res: any) => {
        this.posts = res;
      });
  }

  getPost(id) {
    this.postService.getPost(id)
      .subscribe( res => {
        this.post = res;
      });
  }

  removePost(post) {
    this.postService.removePost(post.id)
      .subscribe( res => {
        const postIndex = this.posts.indexOf(post);
        this.posts.splice(postIndex, 1);
      });
  }

}
