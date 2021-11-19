import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DiscusionService } from 'src/app/services/discusion.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-resena',
  templateUrl: './resena.component.html',
  styleUrls: ['./resena.component.less']
})
export class ResenaComponent implements OnInit {
  activeUser: any;
  comentario: any;
  asignatura: any;
  puntuacion: any;
  comentarioForm: FormGroup;
  constructor(private apiService: DiscusionService,
    private actRoute: ActivatedRoute,private router: Router,
    public fb: FormBuilder,
    private ngZone: NgZone) {this.getUsuario(); 
      this.comentarioForm = fb.group({
        title: fb.control('initial value', Validators.required)
    });
      this.mainForm();}

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.readAsignatura(id);
  }
  readAsignatura(id: any){
    this.apiService.getAsignatura(id).subscribe( data => {
      let sum = 0;
      this.asignatura = data;
      console.log(data);
      this.asignatura.comentarios.forEach((element: { rate: number; }) => {
        sum = element.rate + sum;
        console.log(element.rate)
      });
      this.puntuacion = sum/this.asignatura.comentarios.length;
      console.log("Largo comentarios:" + this.asignatura.comentarios.length + sum);
    })

  }
  mainForm() {
    this.comentarioForm = this.fb.group({
    
      comentario: ['', [Validators.required]],
      rating: ['', [Validators.required]]
    })
  }

  get myForm(){
    return this.comentarioForm.controls;
  }
  getUsuario(){
    this.apiService.getUsuario().subscribe((data) =>{
      this.activeUser = data;
      console.log("usuario validado");
    });
  }

  onSubmit() {
    
    if (!this.comentarioForm.valid) {
      console.log("error en el formulario");
      return false;
    } else {
      let id = this.actRoute.snapshot.paramMap.get('id');
      console.log(id);
      this.apiService.crearComentario(this.comentarioForm.value, id, 'resena').subscribe(
        (res) => {
          console.log('Employee successfully created!')
          
          this.redirectTo('/resena/'+ id);
        }, (error) => {
          console.log(error);
        });
        return true;
    }
  }

  onDelete(id: any){
    let url = this.actRoute.snapshot.paramMap.get('id');
    this.apiService.deleteComentario(id).subscribe(data => {
      console.log(data);
    })
    this.redirectTo('resena/'+ url)
  } 

  getFecha(fecha: String): String {
    let dia = fecha.charAt(8) + fecha.charAt(9);
    let mes = fecha.charAt(5) + fecha.charAt(6);
    let anho = fecha.charAt(0) + fecha.charAt(1) + fecha.charAt(2) + fecha.charAt(3)
    return dia + '-' +  mes + '-' + anho;
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
