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
  DiscusionAll: any;
  activeUser: any;
  constructor(private apiService: DiscusionService, private actRoute: ActivatedRoute) {
    this.getUsuario();
    this.readDiscusion();
    
   }

  ngOnInit(): void {
  }

  readDiscusion(){
    console.log("inicio de readDiscusion()");
    this.apiService.getDiscusiones().subscribe(data => {
      this.DiscusionAll = data;
      console.log(data);
     });
    // if(this.activeUser.intereses){
    //   console.log(this.activeUser.intereses)
    //   for(let interes of this.activeUser.intereses){
    //     this.apiService.getDiscusionesInteres(interes.nombre).subscribe((data) => {
    //       console.log(data);
          
    //        this.Discusion.push(data);
    //      }) 
    //   }
    // }else{
    //   console.log("Usted no posee intereses o no está registrado");
    // }
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

  getFecha(fecha: String): String {
    let dia = fecha.charAt(8) + fecha.charAt(9);
    let mes = fecha.charAt(5) + fecha.charAt(6);
    let anho = fecha.charAt(0) + fecha.charAt(1) + fecha.charAt(2) + fecha.charAt(3)
    return dia + '-' +  mes + '-' + anho;
  }
}
