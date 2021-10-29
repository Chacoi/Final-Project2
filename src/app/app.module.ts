import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IndexComponent } from './components/index/index.component';
import { MisDiscusionesComponent } from './components/mis-discusiones/mis-discusiones.component';
import { MisInteresesComponent } from './components/mis-intereses/mis-intereses.component';
import { ListaResenasComponent } from './components/lista-resenas/lista-resenas.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { ResenaComponent } from './components/resena/resena.component';
import { DiscusionComponent } from './components/discusion/discusion.component';
import { RegisterComponent } from './components/forms/register/register.component';
import { NuevoInteresComponent } from './components/nuevo-interes/nuevo-interes.component';
import { AddDiscusionComponent } from './components/forms/add-discusion/add-discusion.component';
import { AddResenaComponent } from './components/forms/add-resena/add-resena.component';
import { UpdateDiscusionComponent } from './components/forms/update-discusion/update-discusion.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'index'},
  {path: 'index', component: IndexComponent},
  {path: 'mis-discusiones', component: MisDiscusionesComponent},
  {path: 'mis-intereses', component: MisInteresesComponent},
  {path: 'lista-resenas', component: ListaResenasComponent},
  {path: 'mi-perfil', component: MiPerfilComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'nuevo-interes', component: NuevoInteresComponent},
  {path: 'agregar-discusion', component: AddDiscusionComponent},
  {path: 'resena', component: ResenaComponent},
  {path: 'agregar-resena',component: AddResenaComponent},
  {path: ':id/edit', component: UpdateDiscusionComponent},
  {path: ':id', component: DiscusionComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    MisDiscusionesComponent,
    MisInteresesComponent,
    ListaResenasComponent,
    LoginFormComponent,
    ResenaComponent,
    DiscusionComponent,
    RegisterComponent,
    NuevoInteresComponent,
    AddDiscusionComponent,
    AddResenaComponent,
    UpdateDiscusionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
