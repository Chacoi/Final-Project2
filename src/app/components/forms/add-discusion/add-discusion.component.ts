import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DiscusionService } from 'src/app/services/discusion.service';

@Component({
  selector: 'app-add-discusion',
  templateUrl: './add-discusion.component.html',
  styleUrls: ['./add-discusion.component.less']
})
export class AddDiscusionComponent implements OnInit {
  submitted = false;
  discusion:any;
  discusionForm: FormGroup;
  discusionTags:any = ['aula-virtual', 'algebra-lineal', 'ibc', 'biblioteca-fin', 'inf']
  discusionIntereses:any = [];
  discusionTipo:any;
  constructor(public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: DiscusionService,
    private actRoute: ActivatedRoute) {
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
  get myForm(){
    return this.discusionForm.controls;
  }
  onSubmit() {
    // Envío de formulario al servidor

     this.submitted = true;
     if (!this.discusionForm.valid) {
       console.log("datos inválidos")
       return false;
     } else {
       //Envío de lista de intereses al servidor
      const form = document.getElementById("discusionForm");
      const inputs = form!.getElementsByTagName("input");
      for(let input of inputs){
        const interes = input.getAttribute("id");
        const clase = input.getAttribute("class");
        if(clase == 'interes'){
          if(input.checked){
            this.discusionIntereses.push(interes);
          }
        }else if(clase == 'connotacion' && input.checked){
          this.discusionTipo = input.getAttribute("id");

        }
        
      }
      this.discusion = {
        contenido: this.discusionForm.value,
        intereses: this.discusionIntereses,
        tipo: this.discusionTipo
      }
       this.apiService.crearDiscusion(this.discusion).subscribe(
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
