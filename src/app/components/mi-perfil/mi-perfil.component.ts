import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DiscusionService } from 'src/app/services/discusion.service';
@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.less']
})
export class MiPerfilComponent implements OnInit {

  
  constructor(private apiService: DiscusionService,
    private actRoute: ActivatedRoute,
   private router: Router,
   private ngZone: NgZone) {
    
    this.updateData();

    }
    cantDiscusiones: Number | undefined;
    cantComentarios: Number | undefined;
    totalDiscusiones: Number| undefined;
    totalComentarios: Number| undefined;
  ngOnInit(): void {
  }

  updateData(){
    this.apiService.countDiscusiones().subscribe( data => {
      this.cantDiscusiones = data.length;
    })
    this.apiService.countComentarios().subscribe(data => {
      this.cantComentarios = data.length;
    })
    this.apiService.getDiscusionesByUser().subscribe(data => {
      this.totalDiscusiones = data.length;
    })
    this.apiService.getComentariosByUser().subscribe(data =>{
      this.totalComentarios = data.length;
    })
  }
}
