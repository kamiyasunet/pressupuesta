import { Component, OnInit } from '@angular/core';
import { FasesService } from '../../services/fases.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-fases',
  templateUrl: './fases.component.html',
  styleUrls: ['./fases.component.scss']
})
export class FasesComponent implements OnInit {
  fases: any;
  textoBuscar: any;

  constructor(
    private fasesService: FasesService,
    private router: Router) { }

  ngOnInit(): void {
    this.getfases()

  }

  getfases() {

    this.fasesService.getFase1().subscribe(resp => {
       this.fases=resp['fases']
       console.log(resp);
    })
  }


  buscar(event) {
    // Console.log(event);
    this.textoBuscar = event.detail.value;
  }


  gotoConceptos(id){
    
      this.router.navigateByUrl('/pages/fase1/' + id)
   
  }


}
