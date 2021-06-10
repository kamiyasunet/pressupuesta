import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { Actividad } from '../../interfaces/interfaces_actividad';
import { NbDialogService } from '@nebular/theme';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'ngx-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.scss']
})
export class ActividadComponent implements OnInit {
  [x: string]: any;
  actividad: Actividad = {};

constructor() { }

  ngOnInit(): void {

    this.getActividad()
  }

  private getActividad() {
    this.actividad.id_actividad = 1;
    this.actividad.actividad = "Muro M-1";
    this.actividad.descripcion = "Castillo de sección 0.15 x 0.15 mts. concreto hecho en obra f'c= 150 kg/cm2 agregado de 20 mm, incluye : cemento, arena, grava y agua, en revenimiento 8 a 10 cm, con revolvedora, 1 saco    trompo, mano de obra de fabricación, bajas resistencias."
    this.actividad.fase = "fase 1";
    this.actividad.zona = "nivel 1";
    this.actividad.horas_hombre = "25";
    this.actividad.comienzo = this.fecha_comienzo;
    this.actividad.termino = this.fecha_termino;
    this.actividad.presupuesto = "25256.5"
    this.actividad.progreso = 40;
    this.actividad.valor_ganado = "23259.6";
    this.actividad.costo_actual = "23259.6";
    this.actividad.nivel = "N-1";
  }
 
}
