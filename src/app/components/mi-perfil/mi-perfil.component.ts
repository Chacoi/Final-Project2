import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DiscusionService } from 'src/app/services/discusion.service';
@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.less']
})
export class MiPerfilComponent implements OnInit {
  activeUser: any;
  
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
    console.log("get-usuario 1")
    this.apiService.getUsuario().subscribe((data) =>{
      console.log(data);
      this.activeUser = data;
    });
  }
  updateData(){
    this.apiService.countDiscusiones().subscribe( data => {
      this.comendsDiscusiones = data;
      this.apiService.countComentarios().subscribe(data => {
        this.comendsComentarios = data;
        this.apiService.getDiscusionesByUser().subscribe(data => {
          this.totalDiscusiones = data.length;
          this.apiService.getComentariosByUser().subscribe(data =>{
            this.totalComentarios = data.length;
            this.score = (this.comendsDiscusiones * 1.8) + this.totalDiscusiones;
            console.log(this.score);
            this.score = (this.comendsComentarios * 1.2) + this.totalComentarios + this.score;
            console.log(this.score)
          })  
        })  
      })
    })
    
    
  
 
    if(this.score>=50&&this.score<250){
      this.medalla = "../../../../assets/medalla1.png"
    }
    if(this.score>=250&&this.score<500){
      this.medalla = "../../../../assets/medalla2.png"
    }
    if(this.score>=500&&this.score<1000){
      this.medalla = "../../../../assets/medalla3.png"
    }
    if(this.score>=1000&&this.score<1500){
      this.medalla = "../../../../assets/medalla4.png"
    }
    if(this.score>=1500&&this.score<3000){
      this.medalla = "../../../../assets/medalla5.png"
    }
    if(this.score>=3000){
      this.medalla = "../../../../assets/medalla6.png"
    }
  }

  
  
/*
  50ptos = medalla 1
  250ptos = medalla 2
  500ptos = medalla 3
  1000ptos = medalla 4
  1500ptos = medalla 5
  3000ptos = medalla 6
  */
  
}
