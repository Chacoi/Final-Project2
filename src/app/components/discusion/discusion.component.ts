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
  comentarioForm: FormGroup;
  constructor(private apiService: DiscusionService,
     private actRoute: ActivatedRoute,
     public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone
     ) {
      this.comentarioForm = fb.group({
        title: fb.control('initial value', Validators.required)
    });
    this.mainForm();
      }

  discusion: any;
  comentario: any;
  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.readDiscusion(id);
  }

  readDiscusion(id: any){
    this.apiService.getDiscusion(id).subscribe( data => {
      this.discusion = data;
      console.log(data);
    })
  }

  removeDiscusion(comentario: any, index: any) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteComentario(comentario._id).subscribe((data) => {
          this.comentario.splice(index, 1);
        }
      )    
    }
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
      this.apiService.crearComentario(this.comentarioForm.value, id).subscribe(
        (res) => {
          console.log('Employee successfully created!')
          
          this.redirectTo('/'+ id);
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
