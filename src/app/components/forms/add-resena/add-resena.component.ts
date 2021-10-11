import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DiscusionService } from 'src/app/services/discusion.service';

@Component({
  selector: 'app-add-resena',
  templateUrl: './add-resena.component.html',
  styleUrls: ['./add-resena.component.less']
})
export class AddResenaComponent implements OnInit {
  submitted = false;
  resenaForm: FormGroup;
  DiscusionTag:any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin']
  constructor(public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: DiscusionService,
    private actRoute: ActivatedRoute) {
      this.resenaForm = fb.group({
        title: fb.control('initial value', Validators.required)
      });
      this.mainForm();
     }

  ngOnInit(): void {
  }

  mainForm() {
    this.resenaForm = this.fb.group({
      titulo: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      contenido: ['', [Validators.required]]
    })
  }

  // Getter to access form control
  get myForm(){
    return this.resenaForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.resenaForm.valid) {
      return false;
    } else {
      
      this.apiService.crearDiscusion(this.resenaForm.value).subscribe(
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
