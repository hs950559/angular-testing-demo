import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  post: any = {};
  constructor(private router: Router,
              private postService: PostService,
              private route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.route.paramMap
      .subscribe((res: any) => {
        const id = res.get('id');
        this.postService.getPost(id)
          .subscribe((post: any) => {
            this.post = post;
          });
      });
  }

  updatePost(post) {
    post.id = this.post.id;
    this.postService.updatePost(post).subscribe((res: any) => {
      this.router.navigate(['posts']);
    });
  }
}
