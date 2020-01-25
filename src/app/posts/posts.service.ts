import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService {
  API_URL = 'https://sdmplusapi.azurewebsites.net/posts/';
  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(this.API_URL);
  }

  getPost(id) {
    return this.http.get(this.API_URL + id);
  }

  addPost(post) {
    return this.http.post(this.API_URL, post);
  }

  updatePost(post) {
    return this.http.put(this.API_URL + post.id, post);
  }

  removePost(postId) {
    return this.http.delete(this.API_URL + postId);
  }
}
