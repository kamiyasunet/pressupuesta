import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Router, ActivatedRoute} from '@angular/router';
import { filter } from 'rxjs/operators';
import { ResumenService } from '../../../services/resumen.service';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router'

@Component({
  selector: 'ngx-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.scss']
})
export class ListaUsuarioComponent implements OnInit {


  //repeticiones: number = 0;

  usuariosAvance: any;
  date = new FormControl(new Date());
  today: string = new Date().toISOString();

  avance: any;
  recibido_c: number = 0;
  salida_c: number = 0;
  entregado_c: number = 0;
  excepcionado_c: number = 0;
  entrada_c: number = 0;
  recolectado_c: number = 0;
  ruta_c: number = 0;
  faltantes: number = 0;

  

  constructor(
     private service: SmartTableData,
     private router: Router,
     private resumenService: ResumenService,
     public datepipe: DatePipe)
  {
    //const data = this.service.getData();
    this.getAvanceUsuario(this.today);
    this.getDashboard(this.today)
   // this.source.load(data);
   // console.log(this.source);
    

  }
  
  ngOnInit(): void { 
  }

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'yourAction',
          title: '<i class="ion-document" title="YourAction"></i>'
        },
        {
          name: 'editAction',
          title: '<i class="ion-edit" title="Edit"></i>'
        },
        {
          name: 'deleteAction',
          title: '<i class="far fa-trash-alt" title="delete"></i>'
        }
      ],
     
    },        
    columns: {
     
      id_usuario: {
        title: 'Id',
        type: 'number',
      },
      mensajero: {
        title: 'Mensajero',
        type: 'string',
      },
      recibido: {
        title: 'Recibido',
        type: 'number',
      },
      entregado: {
        title: 'Entregado',
        type: 'number',
      },
      excepcionado: {
        title: 'Excepcionado',
        type: 'number',
      },
      recolectado: {
        title: 'Recolectado',
        type: 'number',
      },
      por_entregar: {
        title: 'Por entregar',
        type: 'number',
      },
      avance: {
        title: 'Efectividad',
        type: 'number %',
      },
     
    },
  };

  source: LocalDataSource = new LocalDataSource();


  getAvanceUsuario(date: any) {
    this.resumenService
      .getUsuariosAvance(this.datepipe.transform(date, 'yyyy-MM-dd'))
      .subscribe((resp: any) => {
        this.usuariosAvance = resp.paquetes;

          console.log(this.usuariosAvance);
      });
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
  onCustomAction(event) {
    alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    this.router.navigate(['pages/ourPage']);
  }

  getDashboard(date: any) {
    this.resumenService
      .getPaquetesDashboard(this.datepipe.transform(date, 'yyyy-MM-dd'))
      .subscribe((resp: any) => {
        this.avance = resp.paquetes;
        console.log(this.avance);

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
            this.recibido_c =
              +this.salida_c +
              +this.entregado_c +
              +this.excepcionado_c +
              +this.entrada_c +
              +this.recolectado_c;;
              this.faltantes = +this.entregado_c + +this.excepcionado_c;
        });
        
      });
  }

  gotoUsuario(id:any){

    //pages/usuario-avance/1

    this.router.navigateByUrl('/pages/usuario-avance/'+id)

    
  }


 
}
