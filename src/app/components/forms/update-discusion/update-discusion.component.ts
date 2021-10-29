import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DiscusionService } from 'src/app/services/discusion.service';

@Component({
  selector: 'app-update-discusion',
  templateUrl: './update-discusion.component.html',
  styleUrls: ['./update-discusion.component.less']
})
export class UpdateDiscusionComponent implements OnInit {

  discusionActual: any;
  discusionForm: FormGroup;
  id = this.actRoute.snapshot.paramMap.get('id');
  
  constructor(private apiService: DiscusionService,
    private actRoute: ActivatedRoute,
    public fb: FormBuilder,
   private router: Router,
   private ngZone: NgZone) {
    
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.obtenerDiscusion(id);
    this.discusionForm = fb.group({
      title: fb.control('initial value', Validators.required)
    });
    
    this.mainForm();
    }

  ngOnInit(): void {
  }
  mainForm() {
    this.discusionForm = this.fb.group({
      titulo: ['', [Validators.required]],
      contenido: ['', [Validators.required]]
    })
  }  
  // Getter to access form control
  // get myForm(){
  //   return this.discusionForm.controls;
  // }
  obtenerDiscusion(id: any){
    this.apiService.getDiscusion(id).subscribe(data => {
      this.discusionActual = data;
    })
  }

  onSubmit(){
    this.apiService.updateDiscusion(this.id, this.discusionForm.value).subscribe(
      (res) => {
        console.log('Employee successfully created!')
        
        this.redirectTo(`/${this.id}`);
       
      }, (error) => {
        console.log(error);
      });
  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
