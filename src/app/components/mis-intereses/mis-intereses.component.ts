import { Component, OnInit } from '@angular/core';
import { DiscusionService } from 'src/app/services/discusion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-intereses',
  templateUrl: './mis-intereses.component.html',
  styleUrls: ['./mis-intereses.component.less']
})
export class MisInteresesComponent implements OnInit {
  activeUser: any;
  constructor(public apiService: DiscusionService, public router: Router ) {
    this.getUsuario();
   }

  ngOnInit(): void {
  }
  getUsuario(){
    console.log("get-usuario 1")
    this.apiService.getUsuario().subscribe((data) =>{
      console.log(data);
      this.activeUser = data;
    });
  }
  onClick(data: any){
    this.apiService.eliminarInteres(data).subscribe(
      (res) => {
        console.log('Interés eliminado correctamente')
        this.redirectTo('/mis-intereses');
      }, (error) => {
        console.log(error);
      });
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }
}
