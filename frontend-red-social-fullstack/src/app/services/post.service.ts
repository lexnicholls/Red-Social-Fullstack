import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../app.settings';

const AUTH_API = AppSettings.API_ENDPOINT;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + window.sessionStorage.getItem('auth-user'),
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(userId: string, title: string, content: string) {
    return this.http.post(
      AUTH_API + '/post',
      {
        userId,
        title,
        content,
      },
      httpOptions
    );
  }

  editPost(title: string, content: string) {
    return this.http.put(
      AUTH_API + '/post',
      {
        title,
        content,
      },
      httpOptions
    );
  }

  deletePost(postId: string) {
    return this.http.delete(AUTH_API + '/post?postId=' + postId, httpOptions);
  }

  getAllPost(title: string) {
    return this.http.get(
      AUTH_API + '/post?title=' + title,
      httpOptions
    );
  }

  likePost(postId: string, checked: boolean) {
    return this.http.put(
      AUTH_API + '/post/like?postId=' + postId,
      {
        checked,
      },
      httpOptions
    );
  }
}
