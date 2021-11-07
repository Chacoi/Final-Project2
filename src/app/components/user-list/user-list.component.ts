import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DiscusionService } from 'src/app/services/discusion.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  activeUser: any;
  usuarios: any = [];
  rol: any;
  constructor(private apiService: DiscusionService,
    private actRoute: ActivatedRoute,
   private router: Router,
   private ngZone: NgZone) {
    this.getUsuario();
    this.getUsuarios();
  
    }

  ngOnInit(): void {
  }
  getUsuario(){
    this.apiService.getUsuario().subscribe((data) =>{
      this.activeUser = data;
      console.log("usuario validado");
    });
  }
  getUsuarios(){
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.apiService.getUsuarios().subscribe((data) => {
     console.log(data);
      this.usuarios = data;

    }) 
  }
  darModerador(id: any){
    this.apiService.darPrivilegio(id, {rol: 'moderador'}).subscribe(data => {
      console.log('Rol asignado correctamente');
      this.redirectTo('/user-list');
    });
  }
  darEstudiante(id: any){
    this.apiService.darPrivilegio(id, {rol: 'estudiante'}).subscribe(data => {
      console.log('Rol asignado correctamente');
      this.redirectTo('/user-list');
    });
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
