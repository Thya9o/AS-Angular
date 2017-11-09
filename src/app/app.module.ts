import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HttpClienteComponent } from './views/cliente/httpcliente.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '', component: AppComponent},
  {path: 'home', component: HomeComponent},
  {path: 'clientes', component: HttpClienteComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HttpClienteComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [HttpClienteComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
