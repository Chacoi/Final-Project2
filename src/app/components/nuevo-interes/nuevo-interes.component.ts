import { Component, OnInit } from '@angular/core';
import { DiscusionService } from 'src/app/services/discusion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-interes',
  templateUrl: './nuevo-interes.component.html',
  styleUrls: ['./nuevo-interes.component.less']
})
export class NuevoInteresComponent implements OnInit {
  intereses : any[] = [];
  constructor(public apiService: DiscusionService, public router: Router) {
    this.intereses.push({
      nombre: 'aula-virtual',
      descripcion: 'Asuntos relacionados al aula virtual moodle que posee la escuela'
    })
    this.intereses.push({
      imagen: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=873&q=80',
      nombre: 'algebra-lineal',
      descripcion: 'Asignatura matemática dictada el segundo semestre en las carrera de la escuela de informática'
    })
    this.intereses.push({
      imagen: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=873&q=80',
      nombre: 'ibc',
      descripcion: 'Edificio ubicado en Av. Brasil, en la que se imparten las carreras de la escuela de informática e industrial'
    })
    this.intereses.push({
      imagen: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=873&q=80',
      nombre: 'biblioteca-fin',
      descripcion: 'Biblioteca ubicada en el edificio de la facultad de ingeniería'
    })
    this.intereses.push({
      imagen: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=873&q=80',
      nombre: 'inf',
      descripcion: 'Escuela de informatica de la PUCV'
    })
   }

  ngOnInit(): void {
  }

  onPlusClick(data: any){
    this.apiService.agregarInteres(data).subscribe(
      (res) => {
        console.log('Interés agregado correctamente al usuario')
        this.redirectTo('/mis-intereses');
      }, (error) => {
        console.log(error);
      });
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
