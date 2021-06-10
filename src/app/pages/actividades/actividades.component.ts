import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss']
})
export class ActividadesComponent implements OnInit {

  avances = [
    {
      id_avance: "1",
      fecha: "2021-04-21",
      porcentaje: "5",
      elemento: [
        { item:"1.1"  ,elemento: "Trabe 1", descripcion: "Fabricación de trabe de 40x40cm", progreso: "12" },
        {  item:"1.2" ,elemento: "Trabe 2", descripcion: "Fabricación de trabe de 40x40cm", progreso: "15" },
        {  item:"1.3" ,elemento: "Trabe 3", descripcion: "Fabricación de trabe de 40x40cm", progreso: "20" },
        {  item:"1.4" ,elemento: "Trabe 1", descripcion: "Fabricación de trabe de 40x40cm", progreso: "12" },
        {  item:"1.5" ,elemento: "Trabe 2", descripcion: "Fabricación de trabe de 40x40cm", progreso: "15" },
        {  item:"1.6" ,elemento: "Trabe 3", descripcion: "Fabricación de trabe de 40x40cm", progreso: "20" },
        {  item:"1.7" ,elemento: "Trabe 1", descripcion: "Fabricación de trabe de 40x40cm", progreso: "12" },
        {  item:"1.8" ,elemento: "Trabe 2", descripcion: "Fabricación de trabe de 40x40cm", progreso: "15" },
        {  item:"1.9" ,elemento: "Trabe 3", descripcion: "Fabricación de trabe de 40x40cm", progreso: "20" },
      ],
    },
    {
      id_avance: "2",
      fecha: "2021-04-22",
      porcentaje: "10",
      elemento: [
        { elemento: "Pablo perez", descripcion: "Fabricación de trabe de 40x40cm", progreso: "8" },
      ],
    },
    {
      id_avance: "3",
      fecha: "2021-04-23",
      porcentaje: "15",
      elemento: [
        { elemento: "Pablo perez", descripcion: "Fabricación de trabe de 40x40cm", progreso: "8" },
      ],
    },
  ];

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  gotopage(item){
  console.log(item);
    this.router.navigate(["pages/actividad"]);
  }
  }
