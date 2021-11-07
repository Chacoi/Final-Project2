import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DiscusionService } from 'src/app/services/discusion.service';

@Component({
  selector: 'app-lista-resenas',
  templateUrl: './lista-resenas.component.html',
  styleUrls: ['./lista-resenas.component.less']
})
export class ListaResenasComponent implements OnInit {
  activeUser: any;
  asignaturas: any;
  constructor(private apiService: DiscusionService,
    private actRoute: ActivatedRoute,private router: Router,
    private ngZone: NgZone) {
      this.getUsuario();
      this.readAsignaturas();
    }

  ngOnInit(): void {
  }
  readAsignaturas(){
    this.apiService.getAsignaturas().subscribe(data => {
      this.asignaturas = data;
    })
  }
  getUsuario(){
    this.apiService.getUsuario().subscribe((data) =>{
      this.activeUser = data;
      console.log("usuario validado");
    });
  }
}
