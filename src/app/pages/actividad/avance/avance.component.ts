import { Component, OnInit, TemplateRef } from '@angular/core';
import { Actividad, ElementoNuevo, AvanceNuevo } from '../../../interfaces/interfaces_actividad';
import { DatePipe } from '@angular/common';
import { NbDialogService } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { FormControl, NgForm } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';



@Component({
  selector: "ngx-avance",
  templateUrl: "./avance.component.html",
  styleUrls: ["./avance.component.scss"],
})
export class AvanceComponent implements OnInit {
  options: string[];
  filteredControlOptions$: Observable<string[]>;
  filteredNgModelOptions$: Observable<string[]>;
  inputFormControl: FormControl;
  value: string;
  actividad: Actividad = {};
  today: string = new Date().toISOString();
  fecha_comienzo = this.datepipe.transform(this.today, "yyyy-MM-dd");
  fecha_termino = this.datepipe.transform(this.today, "yyyy-MM-dd");
  avance: AvanceNuevo = {}
  elemento: string;
  cantidad: number;
  elementoNuevo: ElementoNuevo = {};
  avancesNuevo: AvanceNuevo = {};

  avances = [
    {
      id_avance: "1",
      fecha: "2021-04-21",
      porcentaje: "5",
      elemento: [
        { elemento: "Pablo perez", puesto: "Eléctrico", cantidad: "8" },
        { elemento: "Pablo perez", puesto: "Eléctrico", cantidad: "8" },
        { elemento: "Pablo perez", puesto: "Eléctrico", cantidad: "6" },
      ],
    },
    {
      id_avance: "2",
      fecha: "2021-04-22",
      porcentaje: "10",
      elemento: [
        { elemento: "Pablo perez", puesto: "Eléctrico", cantidad: "8" },
      ],
    },
    {
      id_avance: "3",
      fecha: "2021-04-23",
      porcentaje: "15",
      elemento: [
        { elemento: "Pablo perez", puesto: "Eléctrico", cantidad: "8" },
      ],
    },
  ];

  constructor(
    private datepipe: DatePipe,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.options = [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
      "Option 5",
      "Option 6",
    ];
    this.filteredControlOptions$ = of(this.options);
    this.filteredNgModelOptions$ = of(this.options);
    this.inputFormControl = new FormControl();
    this.filteredControlOptions$ = this.inputFormControl.valueChanges.pipe(
      startWith(""),
      map((filterString) => this.filter(filterString))
    );

    this.getActividad();
  }

  guardar(form: NgForm, dialog) {
    console.log(dialog);

    console.log("Submit ejecutado");
  }

  open1(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog).onClose.subscribe((resp) => {

      if (resp.avance.value) {
        var index = this.avances.length + 1;

        var pushAvance = {
          id_avance: index.toString(),
          fecha: this.today,
          porcentaje: resp.avance.value,
          elemento: [],
        };

        this.avances.push(pushAvance);
      }
    });
  }

  open2(dialog: TemplateRef<any>, id_avance) {
    this.dialogService
      .open(dialog, { context: "Texto adicional" })
      .onClose.subscribe((resp) => {
        console.log(resp);
        console.log(dialog);
        if (resp.elemento.value) {
          this.avances.forEach(item => {
            if (item.id_avance === id_avance) {
              var pushElemento = {
                
                elemento: resp.elemento.value,
                cantidad: resp.cantidad.value,
                puesto: "Electrico"              
              };
              item.elemento.push(pushElemento);
              console.log(item);
            }
          });
        }
      });
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((optionValue) =>
      optionValue.toLowerCase().includes(filterValue)
    );
  }

  onModelChange(value: string) {
    this.filteredNgModelOptions$ = of(this.filter(value));
  }

  private getActividad() {
    this.actividad.id_actividad = 1;
    this.actividad.actividad = "Muro M-1";
    this.actividad.descripcion =
      "Castillo de sección 0.15 x 0.15 mts. concreto hecho en obra f'c= 150 kg/cm2 agregado de 20 mm, incluye : cemento, arena, grava y agua, en revenimiento 8 a 10 cm, con revolvedora, 1 saco    trompo, mano de obra de fabricación, bajas resistencias.";
    this.actividad.fase = "fase 1";
    this.actividad.zona = "nivel 1";
    this.actividad.horas_hombre = "25";
    this.actividad.comienzo = this.fecha_comienzo;
    this.actividad.termino = this.fecha_termino;
    this.actividad.presupuesto = "25256.5";
    this.actividad.progreso = 40;
    this.actividad.valor_ganado = "23259.6";
    this.actividad.costo_actual = "23259.6";
    this.actividad.nivel = "N-1";
  }
}
