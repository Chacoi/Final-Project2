import { TestBed } from '@angular/core/testing';

//import { DiscusionService } from './discusion.service';

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DiscusionService {
  
  baseUri:string = 'http://localhost:3000/api';
  discusionUri: string = 'discusion';
  //comunidadUri: string = 'comunidad';
  usuarioUri: string = 'usuario';
  comentarioUri: string = 'comentario';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Crear discusion
  crearDiscusion(data: any, id: any): Observable<any> {
    let url = `${this.baseUri}/${this.discusionUri}/${id}/discusion-create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all comunidades
  // getComunidades() {
  //   return this.http.get(`${this.baseUri}/${this.comunidadUri}`, {withCredentials: true});
  // }

  //Ver todas las discusiones
  getDiscusiones(id: any){
    return this.http.get(`${this.baseUri}/${this.discusionUri}/${id}/discusion-list`);
  }

  // Get discusion
  getDiscusion(id: any): Observable<any> {
    let url = `${this.baseUri}/${this.discusionUri}/discusion-read/${id}`;
    return this.http.get<Response>(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Get comunidad
  // getComunidad(id: any): Observable<any> {
  //   let url = `${this.baseUri}/${this.comunidadUri}/comunidad-read/${id}`;
  //   return this.http.get<Response>(url, {headers: this.headers}).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.errorMgmt)
  //   )
  // }

  // Get comentario
  getComentario(id: any): Observable<any> {
    let url = `${this.baseUri}/${this.comentarioUri}/comentario-read/${id}`;
    return this.http.get<Response>(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update discusion
  updateDiscusion(id: any, data: any): Observable<any> {
    let url = `${this.baseUri}/${this.discusionUri}/discusion-update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Update comunidad
  // updateComunidad(id: any, data: any): Observable<any> {
  //   let url = `${this.baseUri}/${this.comunidadUri}/comunidad-update/${id}`;
  //   return this.http.put(url, data, { headers: this.headers }).pipe(
  //     catchError(this.errorMgmt)
  //   )
  // }

  // Delete discusion
  deleteDiscusion(id: any): Observable<any> {
    let url = `${this.baseUri}/${this.discusionUri}/discusion-delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

    // Delete comunidad
    // deleteComunidad(id: any): Observable<any> {
    //   let url = `${this.baseUri}/${this.comunidadUri}/comunidad-delete/${id}`;
    //   return this.http.delete(url, { headers: this.headers }).pipe(
    //     catchError(this.errorMgmt)
    //   )
    // }

      // Delete comentario
  deleteComentario(id: any): Observable<any> {
    let url = `${this.baseUri}/${this.comentarioUri}/comentario-delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  //Crear Comentario
  crearComentario(data: any, id:any): Observable<any>{
    let url = `${this.baseUri}/${this.comentarioUri}/${id}/comentario-create`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  //Crear comunidad
  // crearComunidad(data: any): Observable<any>{
  //   let url = `${this.baseUri}/${this.comunidadUri}/comunidad-create`;
  //   return this.http.post(url, data)
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )
  // }

  //Crear usuario
  // crearUsuario(data: any): Observable<any>{
  //   let url = `${this.baseUri}/${this.comunidadUri}/register`;
  //   return this.http.post(url, data)
  //   .pipe(
  //     catchError(this.errorMgmt)
  //   )
  // }

  //Verificar usuario
  verificarUsuario(data: any): Observable<any>{
    let url = `${this.baseUri}/${this.usuarioUri}/login`
    return this.http.post(url, data, { withCredentials:true })
    .pipe(
      catchError(this.errorMgmt)
    )
  }

  //Cerrar sesion
  cerrarSesion(data: any): Observable<any>{
    let url = `${this.baseUri}/${this.usuarioUri}/logout`
    return this.http.post(url, data)
    .pipe(
      catchError(this.errorMgmt)
    )
    
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
