import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' },
    { path: 'demo', loadChildren: './demo/demo.module#DemoModule' },
    { path: 'calculator', loadChildren: './calculator/calculator.module#CalculatorModule' },
    { path: 'posts', loadChildren: './posts/posts.module#PostsModule' },
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    { path: '**', component: PageNotFoundComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
