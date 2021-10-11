import { Router } from '@angular/router';
import { DiscusionService } from '../../../services/discusion.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {  
  submitted = false;
  usuarioForm: FormGroup;

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
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
    
  }

  // Choose designation with select dropdown
  updateProfile(e: any){
    this.usuarioForm.get('designation')?.setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.usuarioForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.usuarioForm.valid) {
      return false;
    } else {
      this.apiService.crearUsuario(this.usuarioForm.value).subscribe(
        (res) => {
          console.log('Usuario creado correctamente!')
          
          this.router.navigateByUrl('/mis-discusiones');
        }, (error) => {
          console.log(error);
        });
        return true;
    }
  }
 
}