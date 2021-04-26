import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgressInfo, StatsProgressBarData } from '../../../@core/data/stats-progress-bar';
import { takeWhile } from 'rxjs/operators';
import { ResumenService } from '../../../services/resumen.service';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-estatus-lista',
  templateUrl: './estatus-lista.component.html',
  styleUrls: ['./estatus-lista.component.scss']
})
export class EstatusListaComponent implements OnInit {


  repeticiones: number = 0;

  recibido: any[] = [];
  entrada: any[] = [];
  entregado: any[] = [];
  ruta: any[] = [];
  salida: any[] = [];
  excepcionado: any[] = [];
  paquetes: any;
  usuariosAvance: any;
  avance: any;
  recibido_c: number = 0;
  salida_c: number = 0;
  entregado_c: number = 0;
  excepcionado_c: number = 0;
  entrada_c: number = 0;
  recolectado_c: number = 0;
  ruta_c: number = 0;
  faltantes: number = 0;
  entradaCount: number = 0;
  pickerDate: Date = new Date();
  date = new FormControl(new Date());
  today: string = new Date().toISOString();

  private alive = true;
  
  progressInfoData: ProgressInfo[];

  constructor(
    private statsProgressBarService: StatsProgressBarData,
    private resumenService: ResumenService,
    public datepipe: DatePipe
    
    ) {
    this.statsProgressBarService.getProgressInfoData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.progressInfoData = data;
      });
  }
  ngOnInit(): void {
    this.getDashboard(this.today)
  }

  ngOnDestroy() {
    this.alive = true;
  }

  getDashboard(date: any) {
    this.resumenService
      //.getPaquetesDashboard(this.datepipe.transform(date, 'yyyy-MM-dd'))      
      .getPaquetesDashboard(this.datepipe.transform(date, 'yyyy-MM-dd'))
      .subscribe((resp: any) => {
        this.avance = resp.paquetes;
        console.log("today",this.today," ",this.avance);

        this.avance.forEach((element) => {
          // console.log(element);
          switch (element.estatus) {
            case 'Entrada':
              this.entrada_c = element.cantidad;
              // console.log('Entrada', this.entrada_c);
              break;
            case 'Salida':
              this.salida_c = element.cantidad;
              //  console.log('Salida', this.salida_c);
              break;
            case 'Entregado':
              this.entregado_c = element.cantidad;
              //  console.log('Entregado', this.entregado_c);
              break;
            case 'Ruta':
              this.ruta_c = element.cantidad;
              // console.log('Ruta', this.ruta_c);
              break;
            case 'No entregado':
              this.excepcionado_c = element.cantidad;
              //console.log('Excepcionado', this.excepcionado_c);
              break;
            case 'Recolectado':
              this.recolectado_c = element.cantidad;
              //console.log('Excepcionado', this.excepcionado_c);
              break;
          }


        });
        this.recibido_c =
          +this.salida_c +
          +this.entregado_c +
          +this.excepcionado_c +
          +this.entrada_c +
          +this.recolectado_c;
          this.faltantes = +this.entregado_c + +this.excepcionado_c;
      
      });
  }

 

}