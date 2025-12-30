import { Routes } from '@angular/router';
import { BlogPost } from './blog-post/blog-post';

export const routes: Routes = [
    { path: 'blog', component: BlogPost },
    { path: '', redirectTo: 'blog', pathMatch: 'full' }
];
