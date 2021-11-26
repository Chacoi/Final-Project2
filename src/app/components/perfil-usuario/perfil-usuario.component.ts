import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DiscusionService } from 'src/app/services/discusion.service';
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.less']
})
export class PerfilUsuarioComponent implements OnInit {
  User: any;
  
  constructor(private apiService: DiscusionService,
    private actRoute: ActivatedRoute,
   private router: Router,
   private ngZone: NgZone) {
    
    this.updateData();
    this.getUsuario();
    }
    comendsDiscusiones: number = 0;
    comendsComentarios: number = 0;
    totalDiscusiones: number= 0;
    totalComentarios: number= 0;
    score: number= 0;
    medalla: String | undefined;
  ngOnInit(): void {
  }
  getUsuario(){
    let id = this.actRoute.snapshot.paramMap.get('id');
    console.log("get-usuario 1")
    this.apiService.getUsuarioExterno(id).subscribe((data) =>{
      console.log(data);
      this.User = data;
    });
  }
  updateData(){
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.apiService.countDiscusionesExterno(id).subscribe( data => {
      this.comendsDiscusiones = data;
      this.apiService.countComentariosExterno(id).subscribe(data => {
        this.comendsComentarios = data;
        this.apiService.getDiscusionesByUserExterno(id).subscribe(data => {
          this.totalDiscusiones = data.length;
          this.apiService.getComentariosByUserExterno(id).subscribe(data =>{
            this.totalComentarios = data.length;
            this.score = (this.comendsDiscusiones * 1.8) + this.totalDiscusiones;
            console.log(this.score);
            this.score = (this.comendsComentarios * 1.2) + this.totalComentarios + this.score;
            console.log(this.score)
          })  
        })  
      })
    })
    
    
  
 
    if(this.score>=20&&this.score<120){
      this.medalla = "../../../../assets/medalla1.png";
      this.apiService.updateUsuario(this.medalla).subscribe(data => {
        console.log(data);
      })
    }
    if(this.score>=120&&this.score<210){
      this.medalla = "../../../../assets/medalla2.png";
      this.apiService.updateUsuario(this.medalla).subscribe(data => {
        console.log(data);
      })
    }
    if(this.score>=210&&this.score<360){
      this.medalla = "../../../../assets/medalla3.png";
      this.apiService.updateUsuario(this.medalla).subscribe(data => {
        console.log(data);
      })
    }
    if(this.score>=360&&this.score<540){
      this.medalla = "../../../../assets/medalla4.png";
      this.apiService.updateUsuario(this.medalla).subscribe(data => {
        console.log(data);
      })
    }
    if(this.score>=540&&this.score<780){
      this.medalla = "../../../../assets/medalla5.png";
      this.apiService.updateUsuario(this.medalla).subscribe(data => {
        console.log(data);
      })
    }
    if(this.score>=1000){
      this.medalla = "../../../../assets/medalla6.png";
      this.apiService.updateUsuario(this.medalla).subscribe(data => {
        console.log(data);
      })
    }
  }
}
  
  