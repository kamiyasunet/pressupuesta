import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss']
})
export class PresupuestoComponent implements OnInit {
  
  conceptos = [
    {
      fase: "Preeliminares",
        elemento: [
        { id_concepto: "1",
          clave: "01-01",
          descripcion: "Trazo y nivelacion ",
          unidad:"m2"  },
          {
            id_concepto: "2",
            clave: "01-02",
            descripcion: "Trazo y nivelacion 2 ",
            unidad: "m2"
          },
          {
            id_concepto: "3",
            clave: "01-03",
            descripcion: "Trazo y nivelacion 3 ",
            unidad: "m2"
          },
      
      ],
    },
    {
      fase: "Cimentación",
     
      elemento:  [
        {
          id_concepto: "1",
          clave: "02-01",
          descripcion: "Cimentacion ",
          unidad: "m2"
        },
        {
          id_concepto: "2",
          clave: "02-02",
          descripcion: "Cimentacion 2 ",
          unidad: "m2"
        },
        {
          id_concepto: "3",
          clave: "02-03",
          descripcion: "Cimentacion 3 ",
          unidad: "m2"
        },
      
      ],
    },
    {
      fase: "Loza",
     
      elemento: [
        {
          id_concepto: "1",
          clave: "02-01",
          descripcion: "Loza ",
          unidad: "m2"
        },
        {
          id_concepto: "2",
          clave: "02-02",
          descripcion: "Loza 2 ",
          unidad: "m2"
        },
        {
          id_concepto: "3",
          clave: "02-03",
          descripcion: "Loza 3 ",
          unidad: "m2"
        },

      ],
    },
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
