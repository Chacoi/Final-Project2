import { Component, OnInit } from '@angular/core';
import { DiscusionService } from 'src/app/services/discusion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-interes',
  templateUrl: './nuevo-interes.component.html',
  styleUrls: ['./nuevo-interes.component.less']
})
export class NuevoInteresComponent implements OnInit {
  intereses : any;
  activeUser: any;
  constructor(public apiService: DiscusionService, public router: Router) {
    this.getUsuario();
    this.apiService.getIntereses().subscribe(data => {
      this.intereses = data;
    })
   }

  ngOnInit(): void {
  }

  onPlusClick(data: any){
    this.apiService.agregarInteres(data).subscribe(
      (res) => {
        console.log('Interés agregado correctamente al usuario')
        this.redirectTo('/mis-intereses');
      }, (error) => {
        console.log(error);
      });
  }

  onDelete(id: any){
    this.apiService.deleteInteres(id).subscribe((res) => {
      console.log('Interés eliminado');
      
      this.redirectTo('nuevo-interes');
    }, (error) => {
      console.log(error);
    });
  }
  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
 }

 getUsuario(){
  this.apiService.getUsuario().subscribe((data) =>{
    this.activeUser = data;
    console.log("usuario validado");
  });
}
}
