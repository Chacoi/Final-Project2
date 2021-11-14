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
    comendsDiscusiones: Number = 0;
    comendsComentarios: Number = 0;
    totalDiscusiones: Number= 0;
    totalComentarios: Number= 0;
    userScore:  Number= 0;
    puntajeCommends: Number= 0;
    puntajeCantidad: Number= 0;
    score: Number= 0;
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
    })
    this.apiService.countComentarios().subscribe(data => {
      this.comendsComentarios = data.length;
    })
    this.apiService.getDiscusionesByUser().subscribe(data => {
      this.totalDiscusiones = data.length;
    })
    this.apiService.getComentariosByUser().subscribe(data =>{
      this.totalComentarios = data.length;
    })

  this.puntajeCommends = this.comendsDiscusiones!.valueOf() + this.comendsDiscusiones!.valueOf()
  this.puntajeCommends = this.puntajeCommends!.valueOf() * 2;
  this.puntajeCantidad = this.totalDiscusiones!.valueOf() + this.totalComentarios!.valueOf();
  this.score = this.puntajeCantidad!.valueOf() + this.puntajeCommends!.valueOf();

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
