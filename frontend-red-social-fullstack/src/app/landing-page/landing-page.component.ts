import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Post } from '../interfaces/post.interface';

const USER_KEY = 'auth-user';

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
  })

  postList: Post[] = [] 

  constructor(private postService: PostService) {}

  onCreatePost() {
    const { title, content } = this.postForm.value;
    if (this.postForm.status === 'VALID') {
      const userId = window.sessionStorage.getItem('userId') as string;
      this.postService.createPost(userId, title, content).subscribe(() => {
        this.reloadPage();
      });
    }
  }

  likePost() {
    this.postService
      .likePost('65aeed8cea53118d074fd709', true)
      .subscribe(() => {
        this.reloadPage();
      });
  }

  fetchPostByTitle() {
    const { title } = this.searchForm.value;
    if (this.searchForm.status === 'VALID') {
      this.postService.getAllPost(title).subscribe((res) => {
        this.postList = res as Post[]
      });
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  signout() {
    window.sessionStorage.removeItem(USER_KEY);
    window.location.replace('/signin');
  }
}
