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
      this.asignatura = data;
      console.log(data);
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

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
