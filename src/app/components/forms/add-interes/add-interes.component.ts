import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DiscusionService } from 'src/app/services/discusion.service';

@Component({
  selector: 'app-add-interes',
  templateUrl: './add-interes.component.html',
  styleUrls: ['./add-interes.component.less']
})
export class AddInteresComponent implements OnInit {
  submitted = false;
  interesForm: FormGroup;
  constructor(public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: DiscusionService,
    private actRoute: ActivatedRoute) {
      this.interesForm = fb.group({
        title: fb.control('initial value', Validators.required)
      });
      this.mainForm();
     }

  ngOnInit(): void {
  }

  mainForm() {
    this.interesForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      imagen: ['', [Validators.required]]
    })
  }

  // Getter to access form control
  get myForm(){
    return this.interesForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.interesForm.valid) {
      return false;
    } else {
      
      this.apiService.crearInteres(this.interesForm.value).subscribe(
        (res) => {
          console.log('Interés creado correctamente');
          this.redirectTo(`/nuevo-interes`);
          
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
