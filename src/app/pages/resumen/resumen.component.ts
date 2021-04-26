import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { FormControl } from '@angular/forms';
import { ResumenService } from '../../services/resumen.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {


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

  constructor(
    private resumenService: ResumenService,
    public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getAvanceUsuario(this.today);
    
  }
  getAvanceUsuario(date: any) {
    this.resumenService
      .getUsuariosAvance(this.datepipe.transform(date, 'yyyy-MM-dd'))
      .subscribe((resp: any) => {
        this.usuariosAvance = resp.paquetes;
        //  console.log(this.usuariosAvance);
      });
  }

  

}
