import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscusionService } from 'src/app/services/discusion.service';

@Component({
  selector: 'index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  Discusion: any = [];
  activeUser: any;
  constructor(private apiService: DiscusionService, private actRoute: ActivatedRoute) {
    this.getUsuario();
    
    
   }

  ngOnInit(): void {
  }

  readDiscusion(){
    console.log("inicio de readDiscusion()")
    if(this.activeUser.intereses){
      console.log(this.activeUser.intereses)
      for(let interes of this.activeUser.intereses){
        this.apiService.getDiscusionesInteres(interes.nombre).subscribe((data) => {
          console.log(data);
          
           this.Discusion.push(data);
         }) 
      }
    }else{
      console.log("Usted no posee intereses o no está registrado");
    }
  }

  getUsuario(){
    this.apiService.getUsuario().subscribe((data) =>{
      this.activeUser = data;
      console.log("usuario validado");
      this.readDiscusion();
    });
  }

  removeDiscusion(discusion: any, index: any) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteDiscusion(discusion._id).subscribe((data) => {
          this.Discusion.splice(index, 1);
        }
      )    
    }
  }

}
