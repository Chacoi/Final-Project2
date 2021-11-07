import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DiscusionService } from 'src/app/services/discusion.service';

@Component({
  selector: 'app-resena',
  templateUrl: './resena.component.html',
  styleUrls: ['./resena.component.less']
})
export class ResenaComponent implements OnInit {
  activeUser: any;
  constructor(private apiService: DiscusionService,
    private actRoute: ActivatedRoute,private router: Router,
    private ngZone: NgZone) {this.getUsuario(); }

  ngOnInit(): void {
  }
  getUsuario(){
    this.apiService.getUsuario().subscribe((data) =>{
      this.activeUser = data;
      console.log("usuario validado");
    });
  }

  
}
