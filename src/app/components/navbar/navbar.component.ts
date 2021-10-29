import { Component, OnInit } from '@angular/core';
import { DiscusionService } from 'src/app/services/discusion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
activeUser: any;
 
  constructor(public apiService: DiscusionService) {
    this.getUsuario();
   }
  getUsuario(){
    console.log("get-usuario 1")
    this.apiService.getUsuario().subscribe((data) =>{
      console.log(data);
      this.activeUser = data;
    });
  }
  logout(){
    this.apiService.cerrarSesion().subscribe((data) => {
      console.log("sesión cerrada correctamente");
    });
  }
  ngOnInit(): void {
  }

}
