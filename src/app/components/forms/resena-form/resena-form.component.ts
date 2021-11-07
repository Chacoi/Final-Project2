import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DiscusionService } from 'src/app/services/discusion.service';

@Component({
  selector: 'app-resena-form',
  templateUrl: './resena-form.component.html',
  styleUrls: ['./resena-form.component.less']
})
export class ResenaFormComponent implements OnInit {
  submitted = false;
  asignatura:any;
  asignaturaForm: FormGroup;
  
  constructor(public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: DiscusionService,
    private actRoute: ActivatedRoute) {
      this.asignaturaForm = fb.group({
        title: fb.control('initial value', Validators.required)
      });
      this.mainForm();
     }
  ngOnInit(): void {
  }
  mainForm() {
    this.asignaturaForm = this.fb.group({
      nombre: ['', [Validators.required]],
      clave: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
    })
  }
  // Getter to access form control
  get myForm(){
    return this.asignaturaForm.controls;
  }
  onSubmit() {
    // Envío de formulario al servidor

     this.submitted = true;
     if (!this.asignaturaForm.valid) {
       console.log("datos inválidos")
       return false;
     } else {
      
      this.asignatura = this.asignaturaForm.value;
       
       this.apiService.crearAsignatura(this.asignatura).subscribe(
         (res) => {
           console.log('Employee successfully created!')
           this.redirectTo(`/mis-discusiones`);
          
         }, (error) => {
           console.log(error);
         });
    

         return true;
     }

     
  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
