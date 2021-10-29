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
  comunidadUri: string = 'comunidad';
  comentarioUri: string = 'comentario';
  usuarioUri: string = 'usuario';
  resenaUri: string = 'resena';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  //---------Discusiones-----------
  // Crear discusion
  crearDiscusion(data: any): Observable<any> {
    let url = `${this.baseUri}/${this.discusionUri}/discusion-create`;
    return this.http.post(url, data, { withCredentials:true })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  // Crear discusion
  crearResena(data: any): Observable<any> {
    let url = `${this.baseUri}/${this.resenaUri}/resena-create`;
    return this.http.post(url, data, { withCredentials:true })
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  //Ver todas las discusiones
getDiscusiones(id: any){
  return this.http.get(`${this.baseUri}/${this.discusionUri}/${id}/discusion-list`, { withCredentials:true });
}
//Ver discusiones según usuario activo
getDiscusionesByUser(): Observable<any>{
  return this.http.get(`${this.baseUri}/${this.discusionUri}/discusion-user-list`, { withCredentials:true });
}
//Ver discusiones según interés
getDiscusionesInteres(tag: any){
  return this.http.get(`${this.baseUri}/${this.discusionUri}/discusion-list/${tag}`, {withCredentials: true});
}
// Get discusion
getDiscusion(id: any): Observable<any> {
  let url = `${this.baseUri}/${this.discusionUri}/discusion-read/${id}`;
  return this.http.get<Response>(url, {headers: this.headers, withCredentials:true}, ).pipe(
    map((res: Response) => {
      return res || {}
    }),
    catchError(this.errorMgmt)
  )
}
 // Update discusion
updateDiscusion(id: any, data: any): Observable<any> {
  let url = `${this.baseUri}/${this.discusionUri}/discusion-update/${id}`;
  return this.http.put(url, data, { headers: this.headers, withCredentials:true }).pipe(
    catchError(this.errorMgmt)
  )
}
//Valorar discusion
valorarDiscusion(id:any, data:any): Observable<any> {
  console.log("Comienzo del servicio valorar");
  console.log(id);
  console.log(data);
  let url = `${this.baseUri}/${this.discusionUri}/discusion-valorar/${id}`;
  return this.http.put(url, data, { headers: this.headers, withCredentials:true}).pipe(
    catchError(this.errorMgmt)
  )
  console.log("Fin del servicio valorar");
}
 // Delete discusion
 deleteDiscusion(id: any): Observable<any> {
  let url = `${this.baseUri}/${this.discusionUri}/discusion-delete/${id}`;
  return this.http.delete(url, { headers: this.headers, withCredentials:true }).pipe(
    catchError(this.errorMgmt)
  )
}
//Contar valoraciones positivas de las discusiones
countDiscusiones(): Observable<any> {
  return this.http.get(`${this.baseUri}/${this.discusionUri}/discusion-count`, {withCredentials: true});
}
//-----------------------------
//---------Comentario--------------
 // Get comentario
 getComentario(id: any): Observable<any> {
  let url = `${this.baseUri}/${this.comentarioUri}/comentario-read/${id}`;
  return this.http.get<Response>(url, {headers: this.headers, withCredentials:true}).pipe(
    map((res: Response) => {
      return res || {}
    }),
    catchError(this.errorMgmt)
  )
}
    // Delete comentario
deleteComentario(id: any): Observable<any> {
      let url = `${this.baseUri}/${this.comentarioUri}/comentario-delete/${id}`;
      return this.http.delete(url, { headers: this.headers, withCredentials:true }).pipe(
        catchError(this.errorMgmt)
      )
    }
//Crear Comentario
crearComentario(data: any, id:any): Observable<any>{
  let url = `${this.baseUri}/${this.comentarioUri}/${id}/comentario-create`;
  return this.http.post(url, data, {withCredentials:true})
    .pipe(
      catchError(this.errorMgmt)
    )
}
//Valorar comentario
valorarComentario(id: any, data: any): Observable<any>{
  console.log("Comienzo del servicio valorar");
  console.log(id);
  console.log(data);
  let url = `${this.baseUri}/${this.comentarioUri}/comentario-valorar/${id}`;
  return this.http.put(url, data, { headers: this.headers, withCredentials:true}).pipe(
    catchError(this.errorMgmt)
  )
}
//Contar comends comentarios
countComentarios(): Observable<any> {
  return this.http.get(`${this.baseUri}/${this.comentarioUri}/comentario-count`, {withCredentials: true});
}
//Comentarios del usuario activo
getComentariosByUser(): Observable<any>{
  return this.http.get(`${this.baseUri}/${this.comentarioUri}/comentario-user-list`, { withCredentials:true });
}
//------------------------------
//----------Usuario------------
 //Crear usuario
 crearUsuario(data: any): Observable<any>{
  let url = `${this.baseUri}/${this.usuarioUri}/register`;
  return this.http.post(url, data, {withCredentials:true})
  .pipe(
    catchError(this.errorMgmt)
  )
}
 //Verificar usuario
 verificarUsuario(data: any): Observable<any>{
  let url = `${this.baseUri}/${this.usuarioUri}/login`
  return this.http.post(url, data, { withCredentials:true })
  .pipe(
    catchError(this.errorMgmt)
  )
}
//Usuario activo
getUsuario(): Observable<any> {
  let url = `${this.baseUri}/${this.usuarioUri}/usuario-activo`;
  console.log("get-usuario 2")
  return this.http.get<Response>(url, { withCredentials:true }).pipe(
    map((res: Response) => {
      return res || {}
    }),
    catchError(this.errorMgmt)
  );
}
//Cerrar sesion
cerrarSesion(): Observable<any>{
  let url = `${this.baseUri}/${this.usuarioUri}/logout`
  return this.http.get<Response>(url, { withCredentials:true }).pipe(
    map((res: Response) => {
      return res || {}
    }),
    catchError(this.errorMgmt)
  );
  
}

//-----Interes-----
//Agregar interes
agregarInteres(data: any): Observable<any>{
  let url = `${this.baseUri}/${this.usuarioUri}/interes-add`;
  return this.http.post(url, data, {withCredentials:true})
    .pipe(
      catchError(this.errorMgmt)
    )
}

eliminarInteres(id: any): Observable<any>{
  let url = `${this.baseUri}/${this.usuarioUri}/interes-delete/${id}`;
      return this.http.delete(url, { headers: this.headers, withCredentials:true }).pipe(
        catchError(this.errorMgmt)
      )
}

interesDiscusion(data: any): Observable<any>{
  let url = `${this.baseUri}/${this.usuarioUri}/interes-discusion`;
  return this.http.post(url, data, {withCredentials:true})
    .pipe(
      catchError(this.errorMgmt)
    )
}
//----------------------------
  // Get all comunidades
  getComunidades() {
    return this.http.get(`${this.baseUri}/${this.comunidadUri}`, {withCredentials: true});
  }
  // // Get comunidad
  // getComunidad(id: any): Observable<any> {
  //   let url = `${this.baseUri}/${this.comunidadUri}/comunidad-read/${id}`;
  //   return this.http.get<Response>(url, {headers: this.headers}).pipe(
  //     map((res: Response) => {
  //       return res || {}
  //     }),
  //     catchError(this.errorMgmt)
  //   )
  // }
  // Update comunidad
  // updateComunidad(id: any, data: any): Observable<any> {
  //   let url = `${this.baseUri}/${this.comunidadUri}/comunidad-update/${id}`;
  //   return this.http.put(url, data, { headers: this.headers }).pipe(
  //     catchError(this.errorMgmt)
  //   )
  // }
    // Delete comunidad
    // deleteComunidad(id: any): Observable<any> {
    //   let url = `${this.baseUri}/${this.comunidadUri}/comunidad-delete/${id}`;
    //   return this.http.delete(url, { headers: this.headers }).pipe(
    //     catchError(this.errorMgmt)
    //   )
    // }
  // //Crear comunidad
  // crearComunidad(data: any): Observable<any>{
  //   let url = `${this.baseUri}/${this.comunidadUri}/comunidad-create`;
  //   return this.http.post(url, data)
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )
  // }
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
