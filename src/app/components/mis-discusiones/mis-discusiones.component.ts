import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscusionService } from 'src/app/services/discusion.service';

@Component({
  selector: 'app-mis-discusiones',
  templateUrl: './mis-discusiones.component.html',
  styleUrls: ['./mis-discusiones.component.less']
})
export class MisDiscusionesComponent implements OnInit {
  Discusion: any;
  activeUser: any;
  constructor(private apiService: DiscusionService, private actRoute: ActivatedRoute) {
    this.readDiscusion();
    this.getUsuario();
   }

  ngOnInit(): void {
  }

  readDiscusion(){
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.apiService.getDiscusionesByUser().subscribe((data) => {
     console.log(data);
      this.Discusion = data;

    })    
  }
  getUsuario(){
    this.apiService.getUsuario().subscribe((data) =>{
      this.activeUser = data;
      console.log("usuario validado");
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
