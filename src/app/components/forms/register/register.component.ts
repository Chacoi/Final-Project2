import { Router } from '@angular/router';
import { DiscusionService } from '../../../services/discusion.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {  
  submitted = false;
  usuarioForm: FormGroup;
  selectedFile!: File;
  formData = new FormData();
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: DiscusionService,
    private actRoute: ActivatedRoute
  ) { 
    
    this.usuarioForm = fb.group({
      title: fb.control('initial value', Validators.required)
  });
    this.mainForm();
    
  }

  ngOnInit() { 
    
  }
  
  mainForm() {
    
    this.usuarioForm = this.fb.group({
      email: new FormControl('', [                              //Campo requerido, no puede contener espacios
        Validators.required,
      ]),
      username: new FormControl('', [                           //Campo requerido, 5 caracteres mínimo
        Validators.required,                                    //No puede contener espacios
        Validators.minLength(5)
      ]),
      password: new FormControl('', [                           //Campo requerido, 8 caracteres mínimo
        Validators.required,
        Validators.minLength(8)
      ])
    
  })
}

   onFileSelected(event: any){
    if(event.target.files.length > 0 ){
      const file = event.target.files[0];
      this.selectedFile = file;
    }
   }
  // Choose designation with select dropdown
  updateProfile(e: any){
    this.usuarioForm.get('designation')?.setValue(e, {
      onlySelf: true
    })
  }

  //---------Accesos---------
  get username(){
    return this.usuarioForm.get('username');
  }
  get email(){
    return this.usuarioForm.get('email')
  }
  get password(){
    return this.usuarioForm.get('password');
  }

  onSubmit() {

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    console.log(formData);
    this.apiService.setFile(formData);
    
     this.submitted = true;
     if (!this.usuarioForm.valid) {
       return false;
     } else {
       //this.usuarioForm.value.image = formData;
       this.apiService.crearUsuario(this.usuarioForm.value).subscribe(
         (res) => {
           console.log('Usuario creado correctamente!');
           this.router.navigateByUrl('/mis-discusiones');
         }, (error) => {
           console.log(error);
         });
         return true;
     }
  }

}