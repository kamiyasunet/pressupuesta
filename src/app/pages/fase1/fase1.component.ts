import { Component, OnInit } from '@angular/core';
import { FasesService } from '../../services/fases.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-fase1',
  templateUrl: './fase1.component.html',
  styleUrls: ['./fase1.component.scss']
})
export class Fase1Component implements OnInit {
  fases: any;
  textoBuscar: any;
  claveFase:any=""
  constructor(
    private fasesService: FasesService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.claveFase = this.route.snapshot.params.id;
    this.getfases();
  }

  getfases() {

    this.fasesService.getFase2(this.claveFase.toString()).subscribe(resp => {
      this.fases = resp['fases']
      //console.log(resp);
    })
  }
  
  buscar(event) {
    // Console.log(event);
    this.textoBuscar = event.detail.value;
  }

  gotoConceptos(id) {

    this.router.navigateByUrl(`/pages/conceptos/${id}/${this.claveFase}`)

  }
  gotoBack() {

    this.router.navigateByUrl(`/pages/fases`)

  }

}
