import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  constructor(private router: Router, private postService: PostService) { }

  ngOnInit() {
  }

  addPost(post) {
    this.postService.addPost(post)
      .subscribe(res => {
        this.router.navigate(['posts']);
      });
  }
}
