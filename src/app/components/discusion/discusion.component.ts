import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DiscusionService } from 'src/app/services/discusion.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-discusion',
  templateUrl: './discusion.component.html',
  styleUrls: ['./discusion.component.less']
})
export class DiscusionComponent implements OnInit {
  submitted = false;
  activeUser: any;
  comentarioForm: FormGroup;
  medalla: any;
  constructor(private apiService: DiscusionService,
    private actRoute: ActivatedRoute,
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone
     ) {
      this.getUsuario();
      
      this.comentarioForm = fb.group({
        title: fb.control('initial value', Validators.required)
    });
    this.mainForm();
      }

  discusion: any;
  comentario: any;
  data: any;
  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.readDiscusion(id);
  }

  readDiscusion(id: any){
    this.apiService.getDiscusion(id).subscribe( data => {
      this.discusion = data;
      this.medalla = this.getMedalla(this.discusion.idAutor)
     //console.log(this.medalla);
      console.log(data);
    })
  }

  eliminarComentario(comentario: any, index: any) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteComentario(comentario._id).subscribe((data) => {
          this.comentario.splice(index, 1);
        }
      )    
    }
  }
  getUsuario(){
    this.apiService.getUsuario().subscribe((data) =>{
      this.activeUser = data;
      console.log("usuario validado");
    });
  }
  eliminarDiscusion(){
    console.log("eliminar discusión");
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.apiService.deleteDiscusion(id).subscribe((res) => {
      console.log('Valoracion ingresada correctamente');
      
      this.redirectTo('mis-discusiones');
    }, (error) => {
      console.log(error);
    });
    
    
  }

  mainForm() {
    this.comentarioForm = this.fb.group({
    
      comentario: ['', [Validators.required]]
    })
  }

  get myForm(){
    return this.comentarioForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.comentarioForm.valid) {
      return false;
    } else {
      let id = this.actRoute.snapshot.paramMap.get('id');
      console.log(id);
      this.apiService.crearComentario(this.comentarioForm.value, id, 'discusion').subscribe(
        (res) => {
          console.log('Employee successfully created!')
          
          this.redirectTo('/'+ id);
        }, (error) => {
          console.log(error);
        });
        return true;
    }
  }

  comend(valoracion: Boolean){
    console.log("comienzo de la funcion comend");
    this.data = {
      valoracion: valoracion
    }
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.apiService.valorarDiscusion(id, this.data).subscribe(
      (res) => {
        console.log('Valoracion ingresada correctamente');
        
        this.redirectTo('/'+ id);
      }, (error) => {
        console.log(error);
      });
    console.log("fin de la funcion comend")
  }

  comendComentario(idComentario: any, valoracion: Boolean){
    this.data = {
      valoracion: valoracion
    }
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.apiService.valorarComentario(idComentario, this.data).subscribe(
      (res) => {
        console.log('Valoracion ingresada correctamente');
        
        this.redirectTo('/'+ id);
      }, (error) => {
        console.log(error);
      });
  }

  onDelete(id: any){
    this.apiService.deleteComentario(id).subscribe(data => {
      console.log(data);
    })
  }

  getFecha(fecha: String): String {
    let dia = fecha.charAt(8) + fecha.charAt(9);
    let mes = fecha.charAt(5) + fecha.charAt(6);
    let anho = fecha.charAt(0) + fecha.charAt(1) + fecha.charAt(2) + fecha.charAt(3)
    return dia + '-' +  mes + '-' + anho;
  }

  getMedalla(id: any){
    this.apiService.getMedalla(id).subscribe(data => {
      console.log(data)
      this.medalla = data;
    });
  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
