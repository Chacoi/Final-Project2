import { Component, OnInit } from '@angular/core';
import { DiscusionService } from 'src/app/services/discusion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent implements OnInit {
activeUser: any;

 
  constructor(public apiService: DiscusionService,
    private router: Router) {
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
      this.redirectTo("/index");
    });
  }
  ngOnInit(): void {
  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
