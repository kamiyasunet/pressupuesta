
import { Component, OnInit } from '@angular/core';
import { ConceptosService } from '../../services/conceptos.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'ngx-conceptos',
  templateUrl: './conceptos.component.html',
  styleUrls: ['./conceptos.component.scss']
})
export class ConceptosComponent implements OnInit {
  conceptos: any;
  textoBuscar: any;
  idfase: any;
  idfases: any;

  constructor(private conceptosService: ConceptosService,
              private route: ActivatedRoute,
              private router: Router
              ) {}

  ngOnInit(): void {

    this.idfase = this.route.snapshot.params.id;
    this.idfases = this.route.snapshot.params.idf;
    
    this.getconceptos()

  }

  getconceptos() {

    this.conceptosService.getConceptosFase(this.idfase).subscribe(resp => {
      this.conceptos = resp['conceptos']
      // console.log(resp);
    })
  }


  buscar(event) {
    // Console.log(event);
    this.textoBuscar = event.detail.value;
  }

  gotoMatriz(id_concepto) {
  
   
    this.router.navigateByUrl(`/pages/matrices/${this.idfases}/${this.idfase}/${id_concepto}`)
   
  }

  gotoBack(){

    this.router.navigateByUrl(`/pages/fase1/${this.idfases}`)
    
  }


}