import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Post } from '../interfaces/post.interface';

const USER_KEY = 'auth-user';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
})
export class LandingPageComponent {
  postForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  searchForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  editPostForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  postList: Post[] = [];
  userId = window.sessionStorage.getItem('userId') as string;
  fullName = window.sessionStorage.getItem('fullName') as string;
  email = window.sessionStorage.getItem('email') as string;
  buttonPostEnable = true;

  constructor(private postService: PostService) {
    this.fetchAllPosts();
  }

  onCreatePost() {
    const { title, content } = this.postForm.value;
    if (this.postForm.status === 'VALID') {
      this.buttonPostEnable = false;
      this.postService
        .createPost(this.userId, title, content)
        .subscribe((postCreated) => {
          this.buttonPostEnable = true;
          this.postList = [postCreated, ...this.postList];
          this.postForm.setValue({ title: '', content: '' });
        });
    }
  }

  fetchAllPosts() {
    this.postService.getAllPost('').subscribe((res) => {
      this.postList = res as Post[];
    });
  }

  fetchPostByTitle() {
    const { title } = this.searchForm.value;
    if (this.searchForm.status === 'VALID') {
      this.postService.getAllPost(title).subscribe((res) => {
        this.postList = res as Post[];
      });
    }
  }

  likePost(postId: string) {
    this.postService.likePost(postId, true).subscribe((res) => {
      const likes = res.likes;
      const indexToModify = this.postList.findIndex(
        (post) => post._id === postId
      );
      this.postList[indexToModify].likes = likes;
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  signout() {
    window.sessionStorage.removeItem(USER_KEY);
    window.location.replace('/signin');
  }

  deletePost(postId: string) {
    this.postService.deletePost(postId).subscribe((res) => {
      this.postList = this.postList.filter((post) => post._id !== postId);
    });
  }

  initEditForm(post: Post) {
    console.log(post);
    this.editPostForm.setValue({
      id: post._id,
      title: post.title,
      content: post.content,
    });
  }

  editPost() {
    const { id, title, content } = this.editPostForm.value;
    if (this.editPostForm.status === 'VALID') {
      this.postService
        .editPost(String(id), String(title), String(content))
        .subscribe(() => this.fetchAllPosts());
    }
  }
}
