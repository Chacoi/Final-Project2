import { Router } from '@angular/router';
import { DiscusionService} from '../../../services/discusion.service'
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})

export class EditUsuarioComponent implements OnInit {  
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
      username: ['', [Validators.required]],
      email: ['', [Validators.required]]
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
      console.log("error compare");
      return false;
    } else {
      this.apiService.updateUsuario(this.usuarioForm.value).subscribe(
        (res) => {
          console.log('Usuario encontrado!')
          delay(1000);
          this.redirectTo('/mis-discusiones');
          
        }, (error) => {
          console.log("usuario no encontrado");
          console.log(error);
        });
        return true;
    }
  }
  facebookAuth(){
    this.apiService.facebookAuth().subscribe(data => {
      console.log(data);
    })
  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
 
}
