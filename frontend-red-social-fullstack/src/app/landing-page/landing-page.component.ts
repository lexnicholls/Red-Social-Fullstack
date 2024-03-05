import { Component, HostListener } from '@angular/core';
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
import { Post, PostPagination } from '../interfaces/post.interface';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Pagination } from '../interfaces/pagination';

const USER_KEY = 'auth-user';
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, SidebarComponent],
})
export class LandingPageComponent {
  postForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  searchForm: FormGroup = new FormGroup({
    title: new FormControl(''),
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
  chagePage = false;
  searchInputValue = '';
  timerId?: boolean = false;
  pagination: Pagination<PostPagination> = {
    page: 0,
    limit: 10,
    data: { title: '' },
  };

  constructor(private postService: PostService) {
    this.fetchAllPosts();
  }
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: Event) {
    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      console.log(this.postList.length / 10);

      if ((this.postList.length / 10) % 1 === 0) {
        this.pagination.page = this.pagination.page + 1;
        this.chagePage = true;
      } else {
        this.chagePage = false;
      }

      this.postService.getAllPostPaginated(this.pagination).subscribe((res) => {
        if (!this.chagePage) {
          // Obtener los IDs de los elementos en res (suponiendo que res es un array de objetos con una propiedad 'id')
          const resIds = (res as Post[]).map((post) => post._id);

          // Filtrar this.postList para eliminar los elementos que tienen el mismo ID que los elementos en res
          this.postList = this.postList.filter(
            (post) => !resIds.includes(post._id)
          );
        }
        this.postList = [...this.postList, ...(res as Post[])];
        if ((res as Post[]).length == 0) {
          this.pagination.page = this.pagination.page - 1;
        }
      });
    }
  }

  onCreatePost() {
    const { title, content } = this.postForm.value;
    if (this.postForm.status === 'VALID') {
      this.buttonPostEnable = false;
      this.postService
        .createPost(this.userId, title, content)
        .subscribe((postCreated) => {
          this.buttonPostEnable = true;

          this.pagination.page = 0;
          this.fetchAllPosts();
          this.postForm.setValue({ title: '', content: '' });
        });
    }
  }

  fetchAllPosts() {
    this.postService.getAllPostPaginated(this.pagination).subscribe((res) => {
      this.postList = res as Post[];
    });
  }

  fetchPostByTitle() {
    this.pagination.page = 0;
    this.postService.getAllPostPaginated(this.pagination).subscribe((res) => {
      this.postList = res as Post[];
    });
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
