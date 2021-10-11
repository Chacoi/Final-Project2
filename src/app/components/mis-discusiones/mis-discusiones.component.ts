import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscusionService } from 'src/app/services/discusion.service';

@Component({
  selector: 'app-mis-discusiones',
  templateUrl: './mis-discusiones.component.html',
  styleUrls: ['./mis-discusiones.component.less']
})
export class MisDiscusionesComponent implements OnInit {
  Discusion: any;
  constructor(private apiService: DiscusionService, private actRoute: ActivatedRoute) {
    this.readDiscusion();
    
   }

  ngOnInit(): void {
  }

  readDiscusion(){
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.apiService.getDiscusiones(id).subscribe((data) => {
     console.log(data);
      this.Discusion = data;

    })    
  }

  removeDiscusion(discusion: any, index: any) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteDiscusion(discusion._id).subscribe((data) => {
          this.Discusion.splice(index, 1);
        }
      )    
    }
  }

}
