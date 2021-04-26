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


constructor() { }

  ngOnInit(): void {
}
 
}
